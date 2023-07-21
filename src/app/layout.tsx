import "./globals.css";
import "semantic-ui-css/semantic.min.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Session } from "next-auth";

import { Toaster } from "@/components/common/toaster";

import AuthContext from "./dashboard/components/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Up+right",
  description: "Generated by create next app",
};

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext session={session}>
          <Toaster />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
