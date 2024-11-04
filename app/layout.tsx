"use client"; // Ensure this is client-side if you're using hooks

import localFont from "next/font/local";
import "./globals.css";
import SideBar from "@/components/SideBar";
import { ClerkProvider } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import { getAccessToken } from "@/api/utils"; // Adjust this import as needed
import { metadata } from "./metadata"; // Ensure this path is correct

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const response = await getAccessToken();
        setToken(response);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    handleLogin();
  }, []);

  // Show a loading state while the token is being fetched
  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>{String(metadata.title) || "Default Title"}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href={metadata.icons.icon[0].url} />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SideBar>{children}</SideBar>
        </body>
      </html>
    </ClerkProvider>
  );
}
