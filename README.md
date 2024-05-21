# CatWay Temp Mail

CatWay Temp Mail, a simple temporary email service powered by [Postfix](https://www.postfix.org/) mail server and complemented by the [T3 Stack](https://create.t3.gg/) for the website.

## Getting Started

To set up your own self-hosted temp mail service, follow these steps:

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/TeaByte/catway-mail
   cd catway-mail
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Cloudflare DNS Configuration:**

   Configure your Cloudflare DNS by adding the following records:

   ```py
   # Add MX record to your DNS
   # MX     10    mail.your_domain.com

   # Add A record to your DNS point to your server IP
   # A  0.0.0.0   mail.your_domain.com
   ```

4. **Install and Configure Postfix:**

   Install and set up Postfix with the following commands:

   ```sh
   sudo apt install ufw
   sudo ufw allow 25/tcp
   sudo ufw allow 143/tcp
   sudo ufw allow 993/tcp
   sudo ufw reload

   sudo apt install postfix

   sudo nano /etc/postfix/main.cf
   ```

   In the `main.cf` file, add or edit the following lines:

   ```conf
   myhostname = mail.your_domain.com
   mydestination = $myhostname, your_domain.com, localhost.localdomain, localhost, root
   virtual_alias_maps = hash:/etc/postfix/virtual
   ```

   Next, create or edit the virtual alias file:

   ```sh
   sudo nano /etc/postfix/virtual
   ```

   Add the following line to map emails to the root user:

   ```conf
   @your_domain.com  root
   ```

   After editing the virtual alias file, apply the changes by running:

   ```sh
   sudo postmap /etc/postfix/virtual
   sudo systemctl restart postfix
   ```

5. **Watch Logs:**

   To monitor mail activities, you can tail the mail log:

   ```sh
   tail -f /var/log/mail.log
   ```

That's it!. if every thing works fine all mails will sent to `/var/mail/root`.

6. **Run the Website/Database/Mailparser**

   ```sh
   npm run db:push
   npm run dev
   # it will run at port 5005
   ```
