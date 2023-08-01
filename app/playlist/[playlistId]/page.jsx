"use client";
import Navbar from "@/components/Navbar";
import styles from "../Playlist.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { currentSong } from "@/redux/queueSlice";
import { useDispatch } from "react-redux";

const page = () => {
  const [overlay, setoverlay] = useState(false);
  const { playlistId } = useParams();
  const { data: session } = useSession();
  const [playlistData, setPlaylistData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const response = await fetch(`/api/playlistsongs/${playlistId}`);
      const data = await response.json();
      return setPlaylistData(data);
    };
    fetchPlaylistData();
  }, []);

  const playSong = (songId) => {
    alert(songId);
    dispatch(currentSong(songId));
  };

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
                  <td onClick={playSong(song?._id)}>{index + 1}</td>
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
