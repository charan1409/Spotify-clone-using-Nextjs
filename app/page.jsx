"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { currentSong, pauseSong, playSong } from "@/redux/songSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const playAlbum = async () => {
      const response = await fetch(`/api/albumSongs/One piece`);
      const songs = await response.json();
      if (songs?.length > 0 && isPlaying) {
        dispatch(currentSong(songs[0]?._id));
      }
    };
    playAlbum();
  }, [isPlaying]);

  const getWishes = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className={styles.home_page}>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.greeting}>
          <h1>{getWishes()}</h1>
          <p>Stay tuned and enjoy the music</p>
        </div>
        <div className={styles.albums}>
          <Link href="/album/37i9dQZEVXbLZ52XmnySJg">
            <div className={styles.album}>
              <div className={styles.image}>
                <img
                  src="https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg"
                  alt="album"
                />
                <button
                  className={styles.play_button}
                  onClick={(event) => {
                    event.preventDefault()
                    setIsPlaying(true);
                  }}
                >
                  <i className="bi bi-play-fill"></i>
                </button>
              </div>
              <div className={styles.album_details}>
                <h3>One piece</h3>
                <p>Eiichiro oda</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
