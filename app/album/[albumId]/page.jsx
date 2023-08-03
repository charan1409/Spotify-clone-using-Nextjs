"use client";
import styles from "../album.module.css";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useRef, use } from "react";
import { useSession } from "next-auth/react";
import { currentSong } from "@/redux/songSlice";
import { useDispatch } from "react-redux";

const page = () => {
  const [overlay, setoverlay] = useState(false);
  const overlayCloseRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch(`/api/albumSongs/One piece`);
      const data = await response.json();
      return setSongs(data);
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        overlayCloseRef.current &&
        !overlayCloseRef.current.contains(e.target)
      ) {
        setoverlay(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch(`/api/playlist/${session?.user.id}`);
      const data = await response.json();
      return setPlaylists(data);
    };
    fetchPlaylists();
  }, [overlay]);

  useEffect(() => {
    const playAlbum = () => {
      if (songs?.length > 0) {
        dispatch(currentSong(songs[0]?._id));
      }
    };
    playAlbum();
  }, [isPlaying]);

  const addToPlaylist = async () => {
    const response = await fetch(`/api/playlist/${session?.user.id}`);
    const data = await response.json();
    setPlaylists(data);
    return setoverlay(true);
  };

  const saveToPlaylist = async (playlistId, songId) => {
    const response = await fetch(`/api/playlist/add/${playlistId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songId }),
    });
    const data = await response.json();
    return setoverlay(false);
  };

  return (
    <div>
      <Navbar page={"album"} />
      <div className={styles.album}>
        <div className={styles.albumDetails}>
          <img
            src="https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg"
            alt="Album pic"
          />
          <div className={styles.albumInfo}>
            <strong>ALBUM</strong>
            <h2>One piece</h2>
            <p>Eiichiro oda</p>
            <p>2023</p>
          </div>
        </div>
        <div className={styles.albumBtns}>
          <button
            className={styles.playBtn}
            onClick={() => {
              setIsPlaying(true);
            }}
          >
            <i className="bi bi-play-fill"></i>
          </button>
        </div>
      </div>
      <div className={styles.songsData}>
        {songs?.map((song) => (
          <div key={song?._id} className={styles.songsData__info}>
            <img src={song?.image} alt="" />
            <div className={styles.songsData__infoText}>
              <span>{song?.title}</span>
              <span>{song?.album}</span>
              <span>{song?.artist}</span>
              <span>{song?.year}</span>
            </div>
            <span className={styles.moreOptions} onClick={addToPlaylist}>
              Add
              {overlay && (
                <div className={styles.overlay} ref={overlayCloseRef}>
                  {playlists?.map((playlist) => (
                    <div
                      key={playlist?._id}
                      className={styles.playlistName}
                      onClick={saveToPlaylist(playlist._id, song._id)}
                    >
                      <h5>{playlist.name}</h5>
                    </div>
                  ))}
                </div>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
