"use client";
import Navbar from "@/components/Navbar";
import styles from "../Playlist.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const page = () => {
  const [overlay, setoverlay] = useState(false);
  const { playlistId } = useParams();
  const { data: session } = useSession();
  const [playlistData, setPlaylistData] = useState({});
  useEffect(() => {
    const fetchPlaylistData = async () => {
      const response = await fetch(`/api/playlistsongs/${playlistId}`);
      const data = await response.json();
      return setPlaylistData(data);
    };
    fetchPlaylistData();
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.playlist}>
        <div className={styles.playlist__info}>
          <img src={playlistData?.image} alt="" />
          <div className={styles.playlist__infoText}>
            <strong>PLAYLIST</strong>
            <h2>{playlistData?.name}</h2>
            <p>{playlistData?.description}</p>
            <p>{playlistData?.songs?.length} songs</p>
          </div>
        </div>
        <div className={styles.playlistBtns}>
          {playlistData?.songs?.length > 0 && (
            <span className={styles.playBtn}>
              <i className="bi bi-play-fill"></i>
            </span>
          )}
        </div>
        {playlistData?.songs?.length > 0 && (
          <div className={styles.playlistSongs}>
            <div className={styles.playlistSongs__header}>
              <span>#</span>
              <span>TITLE</span>
              <span>ALBUM</span>
              <span>ARTIST</span>
              <span>YEAR</span>
            </div>
            {playlistData?.songs?.map((song) => (
              <div key={song?._id} className={styles.songsData__info}>
                <img src={song?.image} alt="" />
                <div className={styles.songsData__infoText}>
                  <span>{song?.title}</span>
                  <span>{song?.album}</span>
                  <span>{song?.artist}</span>
                  <span>{song?.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default page;
