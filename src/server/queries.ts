import "server-only";

import fs from "fs";
import { simpleParser } from "mailparser";

console.log("Running email watcher...");

// Path to the mailbox file
const mailboxPath = "/var/mail/root";
let processing = false;

// Function to read and process the mailbox file
async function processMailboxFile() {
  if (!processing) {
    processing = true;
    try {
      fs.readFile(mailboxPath, "utf8", async (err, data) => {
        if (err) {
          console.error("Error reading mailbox file:", err);
          processing = false;
          return;
        }

        const emailMessages: string[] = data
          .split(/^From\s+/m)
          .filter(Boolean);

        for (const emailData of emailMessages) {
          try {
            const parsedEmail = await simpleParser(emailData);
            let toEmail: string | undefined;
            if (Array.isArray(parsedEmail.to)) {
              toEmail = parsedEmail.to[0]?.text ?? undefined;
            } else {
              toEmail = parsedEmail.to?.text ?? undefined;
            }
            if (toEmail) {
              updateOrCreateMail(toEmail, {
                subject: parsedEmail.subject ?? "No subject",
                content: parsedEmail.textAsHtml
                  ? parsedEmail.textAsHtml
                  : parsedEmail.text ?? "No content",
                senderEmail: parsedEmail.from?.text ?? "No sender",
                senderName: parsedEmail.from?.text ?? "No sender",
                html: parsedEmail.html || "No html",
              }).catch((error) => {
                console.error("Error updating or creating mail:", error);
              });
            }
            console.log("Parsed Email:", parsedEmail);
          } catch (error) {
            console.error("Error parsing email:", error);
          }
        }

        // After processing, truncate the mailbox file
        truncateMailbox();
        processing = false;
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      processing = false;
    }
  }
}

// Function to truncate the mailbox file
async function truncateMailbox() {
  fs.truncate(mailboxPath, 0, (err) => {
    if (err) {
      console.error("Error truncating mailbox file:", err);
    } else {
      console.log("Mailbox file truncated successfully.");
    }
  });
}

// Read and process the mailbox file every 2 seconds
setInterval(processMailboxFile, 2000);


import { db } from "~/server/db";
import type { MailData } from "~/types";

export async function getMailData(mailboxOwner: string) {
  const mailsInMailBox = await db.mailBox.findUnique({
    where: {
      mail: mailboxOwner,
    },
    include: {
      mails: {
        select: {
          id: true,
          senderEmail: true,
          senderName: true,
          subject: true,
          createdAt: true,
          updatedAt: true,
          expireAt: true,
        },
      },
    },
  });

  return mailsInMailBox;
}

export async function getInbox(id: string) {
  const inbox = await db.mail.findUnique({
    where: {
      id: id,
    },
  });

  return inbox;
}

export async function __createMail(mailboxOwner: string, mailData: MailData) {
  const expireAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const mailbox = await db.mailBox.create({
    data: {
      mail: mailboxOwner,
    },
  });
  const mail = await db.mail.create({
    data: {
      ...mailData,
      mailboxOwner,
      expireAt,
    },
  });

  return mailbox;
}

export async function __updateMail(emailSlug: string, mailData: MailData) {
  const expireAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  await db.mailBox.update({
    where: {
      mail: emailSlug,
    },
    data: {
      mails: {
        create: {
          ...mailData,
          expireAt,
        },
      },
    },
  });

  return true;
}

export async function updateOrCreateMail(
  emailSlug: string,
  mailData: MailData,
): Promise<void> {
  const existingMailBox = await db.mailBox.findUnique({
    where: {
      mail: emailSlug,
    },
    include: {
      mails: true,
    },
  });
  if (existingMailBox) {
    await __updateMail(emailSlug, mailData);
  } else {
    await __createMail(emailSlug, mailData);
  }
}
