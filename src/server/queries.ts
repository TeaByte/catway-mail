import "server-only";

import { db } from "~/server/db";

interface Mail {
  senderEmail: string;
  senderName: string;
  subject: string;
  content: string;
  html: string;
}

export async function getMailData() {
  const mailsInMailBox = await db.mailBox.findUnique({
    where: {
      mail: "1",
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

export async function __createMail(mailboxOwner: string, mailData: Mail) {
  const expireAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const mail = await db.mail.create({
    data: {
      ...mailData,
      mailboxOwner,
      expireAt,
    },
  });
  const mailbox = await db.mailBox.create({
    data: {
      mail: mail.id,
    },
  });

  return mailbox;
}

export async function __updateMail(emailSlug: string, mailData: Mail) {
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
  mailData: Mail,
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
