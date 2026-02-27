import "./globals.css";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Phool Aur Kaante 💕",
  description:
    "Discover you and your partner's compatibility based on your date of birth. Find out how the stars align!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
