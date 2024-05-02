import "server-only";

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
