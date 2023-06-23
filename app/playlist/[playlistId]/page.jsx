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
        {/* <div className={styles.playlist__songs}>
          <div className={styles.playlist__icons}>
            <PlayCircleFilledIcon className={styles.playlist__shuffle} />
            <FavoriteIcon fontSize="large" />
            <MoreHorizIcon />
          </div>
          {playlistData?.songs?.map((song) => (
            <SongRow track={song.track} />
          ))}
        </div> */}
      </div>
    </>
  );
};

export default page;
