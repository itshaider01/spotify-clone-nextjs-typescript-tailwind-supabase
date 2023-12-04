import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import SpotifyToken from "@/components/SpotifyToken";

const fig = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen Good Music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSong = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={fig.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <SpotifyToken>
              <ModalProvider />
              <Sidebar songs={userSong}>{children}</Sidebar>
              <Player />
            </SpotifyToken>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
