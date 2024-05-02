import fs from "fs";
import { simpleParser } from "mailparser";
import { updateOrCreateMail } from "./queries";

console.log("Running email watcher...");

// Path to the mailbox file
const mailboxPath = "/var/mail/root";
let processing = false;

// Function to read and process the mailbox file
async function processMailboxFile() {
  if (!processing) {
    processing = true;
    try {
      const data: string = await new Promise((resolve, reject) => {
        fs.readFile(mailboxPath, "utf8", (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });

      const emailMessages: string[] = data.split(/^From\s+/m).filter(Boolean);
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
            await updateOrCreateMail(toEmail, {
              subject: parsedEmail.subject ?? "No subject",
              content: parsedEmail.textAsHtml
                ? parsedEmail.textAsHtml
                : parsedEmail.text ?? "No content",
              senderEmail: parsedEmail.from?.text ?? "No sender",
              senderName: parsedEmail.from?.text ?? "No sender",
              html: parsedEmail.html || "No html",
            });
          }
          return parsedEmail;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error parsing email: ${error.message}`);
          } else {
            throw new Error(`Error parsing email: ${String(error)}`);
          }
        }
      }
      // After processing, truncate the mailbox file
      truncateMailbox();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unexpected error: ${error.message}`);
      } else {
        throw new Error(`Unexpected error: ${String(error)}`);
      }
    }
    processing = false;
  }
}

// Function to truncate the mailbox file
function truncateMailbox() {
  fs.truncate(mailboxPath, 0, (err) => {
    if (err) {
      throw new Error(`Error truncating mailbox file: ${err.message}`);
    }
  });
}

// Read and process the mailbox file every 2 seconds
export function processMailboxAndLogResult() {
  processMailboxFile()
    .then((result) => {
      if (result) {
        console.log(result);
      } else {
        console.log("Processing mailbox...");
      }
    })
    .catch((error) => console.error(error));
}
