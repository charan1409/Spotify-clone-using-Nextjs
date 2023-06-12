import "@/styles/globals.css";
import { Inter } from "next/font/google";
import HomeSection from "@/components/HomeSection";
import PlaylistSection from "@/components/PlaylistSection";
import SongTrack from "@/components/SongTrack";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify clone App",
  description: "Spotify clone app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        ></link>
      </head>
      <body className={inter.className}>
        <div className="layout">
          <div className="home_playtlist_section">
            <HomeSection />
            <PlaylistSection />
          </div>
          <div className="pages_section">{children}</div>
        </div>
        <div className="songtrackSection">
          <SongTrack />
        </div>
      </body>
    </html>
  );
}
