"use client";
import styles from "./SongTrack.module.css";
import VolumeSlider from "./VolumeSlider/VolumeSlider";
import { useState, useEffect, useRef } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useSelector } from "react-redux";

const SongTrack = () => {
  const [providers, setProviders] = useState(null);
  const [song, setSong] = useState(null);
  const [volume, setVolume] = useState(100);

  const { data: session } = useSession();
  const songId = useSelector((state) => state.queueReducer.songId);

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
      console.log(data);
      return setSong(data);
    };
    fetchSong();
  }, [songId]);

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  return (
    <>
      {session?.user ? (
        <div className={styles.songtrack}>
          {session?.user && songId ? (
            <div className={styles.song_info}>
              <img src={song?.image} alt="song_pic" />
              <div className={styles.song_details}>
                <h3>{song?.title}</h3>
                <p>{song && song?.artist}</p>
              </div>
            </div>
          ) : (
            <div className={styles.nothing}></div>
          )}
          <div className={styles.player_track}>
            <div className={styles.player}>
              {song ? (
                <audio className={styles.audioPlayer} controls>
                  <source src={song?.file} type="audio/mpeg" />
                </audio>
              ) : (
                <>
                  <div className={styles.options}>
                    <i className="bi bi-shuffle"></i>
                    <i className="bi bi-chevron-bar-left"></i>
                    <i className="bi bi-pause-circle-fill"></i>
                    <i className="bi bi-chevron-bar-right"></i>
                    <i className="bi bi-repeat"></i>
                  </div>
                  <span className={styles.time}>--:--</span>
                  <div className={styles.line}></div>
                  <span className={styles.time}>--:--</span>
                </>
              )}
            </div>
          </div>
          <div className={styles.song_options}>
            <i className="bi bi-music-note" title="lyrics"></i>
            <i className="bi bi-music-note-list" title="queue"></i>
            <span className={styles.volumeControl}>
              <i className="bi bi-volume-up-fill" title="mute"></i>
              <VolumeSlider
                volume={volume}
                onVolumeChange={handleVolumeChange}
              />
            </span>
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
