import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";  

export const metadata = {
  title: "Globetrotter",
  description: "Globetrotter: Solve clues, guess places, unlock trivia, and explore the world! 🌍✨",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Providers> 
          {children}
        </Providers>
      </body>
    </html>
  );
}
