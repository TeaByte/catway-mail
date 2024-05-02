import { PrismaClient } from "@prisma/client";
import { processMailboxFile } from "./mail-parser";
import { deleteExpiredMails } from "./queries";

import { env } from "~/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

setInterval(processMailboxFile, 2000); // 2 secs
setInterval(deleteExpiredMails, 6 * 60 * 60 * 1000); // 6 hours

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
