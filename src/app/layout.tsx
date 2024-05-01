import "~/styles/globals.css";

import { Rubik } from "next/font/google";

import TopNav from "./_components/top-nav";
import Footer from "./_components/footer";

const font = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "CatWay MAIL",
  description:
    "Purring into your inbox with temporary addresses, ensuring your privacy pounces away without a trace.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`dark ${font.className}`}>
        <TopNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
