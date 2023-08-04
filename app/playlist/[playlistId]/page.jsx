"use client";
import Navbar from "@/components/Navbar";
import styles from "../Playlist.module.css";
import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { removeSong } from "@/redux/songSlice";
import { addSong } from "@/redux/queueSlice";
import { useDispatch } from "react-redux";

const page = () => {
  const [overlay, setoverlay] = useState(false);
  const { playlistId } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [playlistData, setPlaylistData] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
  }, [session?.user]);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const response = await fetch(`/api/playlistsongs/${playlistId}`);
      const data = await response.json();
      return setPlaylistData(data);
    };
    fetchPlaylistData();

    const playPlaylist = () => {
      if (playlistData) {
        dispatch(removeSong());
        dispatch(addSong(playlistData?.songs));
      }
    };
    if (isPlaying) {
      if (playlistData?.songs?.length > 0) {
        playPlaylist();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <Navbar />
      <div className={styles.playlist}>
        <div className={styles.playlist__info}>
          <img src={playlistData?.image} alt="playlist_cover" />
          <div className={styles.playlist__infoText}> 
            <strong>PLAYLIST</strong>
            <h2>{playlistData?.name}</h2>
            <p>{playlistData?.description}</p>
            <p>{playlistData?.songs?.length} songs</p>
          </div>
        </div>
        <div className={styles.playlistBtns}>
          {playlistData?.songs?.length > 0 && (
            <button
              className={styles.playBtn}
              onClick={() => {
                setIsPlaying(true);
              }}
            >
              <i className="bi bi-play-fill"></i>
            </button>
          )}
        </div>
        {playlistData?.songs?.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>TITLE</th>
                <th>ALBUM</th>
                <th>ARTIST</th>
                <th>YEAR</th>
              </tr>
            </thead>
            <tbody>
              {playlistData?.songs?.map((song, index) => (
                <tr key={song?._id}>
                  <td>
                    <button
                      onClick={() => {
                        setIsPlaying(true);
                      }}
                      className={styles.songPlayBtn}
                    >
                      <i className="bi bi-play-fill"></i>
                    </button>
                  </td>
                  <td>
                    <span className={styles.title}>
                      <img src={song?.image} alt="" />
                      {song?.title}
                    </span>
                  </td>
                  <td>{song?.album}</td>
                  <td>{song?.artist}</td>
                  <td>{song?.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default page;
