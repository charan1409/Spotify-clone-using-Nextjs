import styles from "./SongTrack.module.css";

const SongTrack = () => {
  return (
    <div className={styles.songtrack}>
      <div className={styles.song_info}>
        <img src="https://picsum.photos/60" alt="song_pic" />
        <div className={styles.song_details}>
          <h3>song name</h3>
          <p>artist name</p>
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
        <i className="bi bi-music-note"></i>
        <i className="bi bi-music-note-list"></i>
        <i className="bi bi-volume-up-fill"></i>
        <div className={styles.volume_line}></div>
      </div>
    </div>
  );
};

export default SongTrack;
