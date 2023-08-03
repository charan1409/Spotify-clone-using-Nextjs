"use client";
import styles from "./SongTrack.module.css";
import VolumeSlider from "./VolumeSlider/VolumeSlider";
import { useState, useEffect, useRef } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { currentSong, removeSong, shuffleQueue } from "@/redux/songSlice";
import { set } from "mongoose";

const SongTrack = () => {
  const [providers, setProviders] = useState(null);
  const [song, setSong] = useState(null);
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(-1);
  const [duration, setDuration] = useState(-2);

  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const { data: session } = useSession();
  const songId = useSelector((state) => state.songReducer.songId);
  const queue = useSelector((state) => state.queueReducer.queue);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
    const addSongToCurrentSong = () => {
      if (queue?.length > 0) {
        dispatch(currentSong(queue[0]._id));
      }
    };
    addSongToCurrentSong();
    const fetchSong = async () => {
      if (songId) {
        const response = await fetch(`/api/song/${songId}`);
        const data = await response.json();
        return setSong(data);
      }
    };
    fetchSong();
  }, []);

  useEffect(() => {
    const fetchSong = async () => {
      if (songId) {
        const response = await fetch(`/api/song/${songId}`);
        const data = await response.json();
        return setSong(data);
      }
    };
    fetchSong();
  }, [songId]);

  useEffect(() => {
    const addSongToCurrentSong = () => {
      if (queue.length > 0) {
        dispatch(currentSong(queue[0]._id));
      }
    };
    addSongToCurrentSong();
  }, [queue]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.volume = volume / 100;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, [audioRef.current, volume]);

  useEffect(() => {
    if (currentTime === duration) {
      setIsPlaying(false);
    }
  }, [currentTime]);

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const formatDuration = (duration) => {
    if (!isNaN(duration) && !(duration < 0)) {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } else {
      return "--:--";
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleSeek = (event) => {
    if (audioRef.current) {
      const seekTime = parseFloat(event.target.value);
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <>
      {session?.user ? (
        <div className={styles.songtrack}>
          {session?.user && songId ? (
            <div
              className={`${
                song === null ? styles.song_info_disable : styles.song_info
              }`}
            >
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
              <div className={styles.options}>
                <audio
                  className={styles.audioPlayer}
                  src={song?.file}
                  ref={audioRef}
                  controls
                  autoPlay
                ></audio>
                <div
                  className={`${
                    song === null
                      ? styles.controlBtnsDisable
                      : styles.controlBtns
                  }`}
                >
                  <i className="bi bi-shuffle"></i>
                  <i
                    className="bi bi-chevron-bar-left"
                    onClick={() => {
                      handleRestart();
                      setIsPlaying(true);
                    }}
                  ></i>
                  {isPlaying ? (
                    <i
                      className="bi bi-pause-fill"
                      style={{ fontSize: "30px" }}
                      onClick={() => {
                        audioRef.current.pause();
                        setIsPlaying(false);
                      }}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-play-fill"
                      style={{ fontSize: "30px" }}
                      onClick={() => {
                        if (currentTime === duration) {
                          handleRestart();
                          setIsPlaying(true);
                        } else {
                          audioRef.current.play();
                          setIsPlaying(true);
                        }
                      }}
                    ></i>
                  )}
                  <i
                    className="bi bi-chevron-bar-right"
                    onClick={() => {
                      handleRestart();
                      setIsPlaying(true);
                    }}
                  ></i>
                  <i className="bi bi-repeat"></i>
                </div>
                <span className={styles.timeline}>
                  <span className={styles.time}>
                    <p>{formatDuration(currentTime)}</p>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    step={0.1}
                    className={`${
                      song ? styles.progressInput : styles.progressInputDisable
                    }`}
                  />
                  <span className={styles.time}>
                    <p>{formatDuration(duration)}</p>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.song_options}>
            <i className="bi bi-music-note" title="lyrics"></i>
            <i className="bi bi-music-note-list" title="queue"></i>
            <span className={styles.volumeControl}>
              {volume > 0 ? (
                <i
                  className="bi bi-volume-up-fill"
                  onClick={() => setVolume(0)}
                ></i>
              ) : (
                <i
                  className="bi bi-volume-mute-fill"
                  onClick={() => setVolume(100)}
                ></i>
              )}
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
