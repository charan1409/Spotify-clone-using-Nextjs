"use client";
import styles from "./SongTrack.module.css";
import { useState, useEffect, useRef } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useSelector } from "react-redux";

const SongTrack = () => {
  const [providers, setProviders] = useState(null);
  const [song, setSong] = useState(null);
  const { data: session } = useSession();
  const songId = useSelector((state) => state.queueReducer.songId);
  console.log(songId)
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
    const fetchSong = async () => {
      const response = await fetch(`api/song/${songId}`);
      const data = await response.json();
      return setSong(data);
    };
    fetchSong();
  }, []);

  useEffect(() => {
    const fetchSong = async () => {
      const response = await fetch(`api/song/${songId}`);
      const data = await response.json();
      console.log(data)
      return setSong(data);
    };
    fetchSong();
  }, [songId])

  return (
    <>
      {session?.user ? (
        <div className={styles.songtrack}>
          <div
            className={`${styles.song_info} ${
              session?.user && songId && styles.active
            }`}
          >
            <img src={song?.image} alt="song_pic" />
            <div className={styles.song_details}>
              <h3>{song?.title}</h3>
              <p>
                {session?.user.recentlyPlayed &&
                  session?.user.recentlyPlayed.song.artist}
              </p>
            </div>
            <i className="bi bi-heart"></i>
          </div>
          <div className={styles.player_track}>
            <div className={styles.options}>
              <i className="bi bi-shuffle"></i>
              <i className="bi bi-chevron-bar-left"></i>
              <i className="bi bi-pause-circle-fill"></i>
              <i className="bi bi-chevron-bar-right"></i>
              <i className="bi bi-repeat"></i>
            </div>
            <div className={styles.player}>
              <span className={styles.time}>00:00</span>
              <div className={styles.line}></div>
              <div className={styles.circle}></div>
              <span className={styles.time}>03:45</span>
            </div>
          </div>
          <div className={styles.song_options}>
            <i className="bi bi-music-note" title="lyrics"></i>
            <i className="bi bi-music-note-list" title="queue"></i>
            <i className="bi bi-volume-up-fill" title="mute"></i>
          </div>
        </div>
      ) : (
        <div className={styles.signInBlock}>
          <div className={styles.text}>
            <h3>PREVIEW OF SPOTIFY</h3>
            <p>Sign in to listen to full songs</p>
          </div>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className={styles.signInBtn}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in for free
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default SongTrack;
