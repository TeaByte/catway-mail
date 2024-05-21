import fs from "fs";
import { simpleParser } from "mailparser";
import { updateOrCreateMail } from "./queries";

console.log("Running email watcher...");

// Path to the mailbox file
const mailboxPath = "/var/mail/root";
let processing = false;

const parserSenderRegex = /"([^"]+)"\s*<([^>]+)>/;
function extractNameAndEmail(toField: string): {
  name: string | null;
  email: string | null;
} {
  const matches: RegExpMatchArray | null = toField.match(parserSenderRegex);
  if (matches && matches.length === 3) {
    const name: string | undefined = matches[1];
    const email: string | undefined = matches[2];
    return { name: name ?? null, email: email ?? null };
  } else {
    return { name: null, email: null };
  }
}

// Function to read and process the mailbox file
export async function processMailboxFile() {
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

      // Process each email message
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
            const { name, email } = extractNameAndEmail(
              parsedEmail.from?.text ?? "",
            );
            await updateOrCreateMail(toEmail, {
              subject: parsedEmail.subject ?? "No subject",
              content: parsedEmail.textAsHtml
                ? parsedEmail.textAsHtml
                : parsedEmail.text ?? "No content",
              senderEmail: email ?? "No sender email",
              senderName: name ?? "No sender name",
              html: parsedEmail.html || "No html",
            });

            // Delete the processed email from the mailbox file
            await deleteProcessedEmail(emailData);
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error parsing email: ${error.message}`);
          } else {
            throw new Error(`Error parsing email: ${String(error)}`);
          }
        }
      }
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

// Function to delete the processed email from the mailbox file
async function deleteProcessedEmail(emailData: string) {
  // Read the content of the mailbox file
  const currentData: string = await fs.promises.readFile(mailboxPath, "utf8");

  // Replace the processed email content with an empty string
  const newData: string = currentData.replace(emailData, "");

  // Write the updated content back to the mailbox file
  await fs.promises.writeFile(mailboxPath, newData);
}
