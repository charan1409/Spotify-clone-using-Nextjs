"use client";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { useSession } from "next-auth/react";
import { currentSong } from "@/redux/queueSlice";
import { useDispatch } from "react-redux";

const page = () => {
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [overlay, setoverlay] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/songs");
      const data = await response.json();
      return setSongs(data);
    };
    fetchSongs();
  }, []);

  const addToPlaylist = async () => {
    const response = await fetch(`/api/playlist/${session?.user.id}`);
    const data = await response.json();
    setPlaylists(data);
    return setoverlay(true);
  };

  const saveToPlaylist = async (playlistId,songId) => {
    const response = await fetch(`/api/playlist/add/${playlistId}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({songId}),
    });
    const data = await response.json();
    console.log(data);
    return setoverlay(false);
  };

  const playSong = (songId) => {
    dispatch(currentSong(songId));
  };

  return (
    <>
      <Navbar page={"search"} />
      <div className={styles.songsData}>
        {songs?.map((song) => (
          <div key={song?._id} className={styles.songsData__info}>
            <img src={song?.image} alt="" onClick={playSong(song?._id)}/>
            <div className={styles.songsData__infoText}>
              <span>{song?.title}</span>
              <span>{song?.album}</span>
              <span>{song?.artist}</span>
              <span>{song?.year}</span>
            </div>
            <span className={styles.moreOptions} onClick={addToPlaylist}>
              Add
              {overlay && (
                <div className={styles.overlay}>
                  {playlists?.map((playlist) => (
                    <div key={playlist?._id} className={styles.playlistName} onClick={saveToPlaylist(playlist._id,song._id)}>
                      <h5>{playlist.name}</h5>
                    </div>
                  ))}
                </div>
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
