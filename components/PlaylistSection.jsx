import styles from "./PlaylistSection.module.css";

const PlaylistSection = () => {
  return (
    <div className={styles.playlist_section}>
      <div className={styles.nav_bar}>
        <div className={styles.top_heading}>
          <p className={styles.heading}>
            <span className={styles.icons}>
              <i className="bi bi-collection-fill"></i>
            </span>
            Your Library
          </p>
          <span className={styles.right_icons}>
            <i className={`bi bi-plus ${styles.add}`}></i>
            <i className={`bi bi-arrow-right-short ${styles.arrow}`}></i>
          </span>
        </div>
        <div className={styles.options}>
          <p className={styles.options_button}>Playlists</p>
          <p className={styles.options_button}>Artists</p>
        </div>
      </div>
      <div className={styles.playlists_artists}>
        <div className={styles.top_bar}>
          <span className={styles.search_icon}>
            <i className="bi bi-search"></i>
          </span>
          <div className={styles.sort_options}>
            <p className={styles.sort_option}>Recents</p>
            <span className={styles.options_arrow}>
              <i className="bi bi-caret-down-fill"></i>
            </span>
          </div>
        </div>
        <div className={styles.playlists}>
          <div className={styles.playlist}>
            <img
              src="https://picsum.photos/60"
              alt="playlist"
              className={styles.playlist_image}
            />
            <p className={styles.playlist_name}>Playlist name</p>
          </div>
          <div className={styles.playlist}>
            <img
              src="https://picsum.photos/60"
              alt="playlist"
              className={styles.playlist_image}
            />
            <p className={styles.playlist_name}>Playlist name</p>
          </div>
          <div className={styles.playlist}>
            <img
              src="https://picsum.photos/60"
              alt="playlist"
              className={styles.playlist_image}
            />
            <p className={styles.playlist_name}>Playlist name</p>
          </div>
          <div className={styles.playlist}>
            <img
              src="https://picsum.photos/60"
              alt="playlist"
              className={styles.playlist_image}
            />
            <p className={styles.playlist_name}>Playlist name</p>
          </div>
          <div className={styles.playlist}>
            <img
              src="https://picsum.photos/60"
              alt="playlist"
              className={styles.playlist_image}
            />
            <p className={styles.playlist_name}>Playlist name</p>
          </div>
          <div className={styles.playlist}>
            <img
              src="https://picsum.photos/60"
              alt="playlist"
              className={styles.playlist_image}
            />
            <p className={styles.playlist_name}>Playlist name</p>
          </div>
          <div className={styles.playlist}>
            <img
              src="https://picsum.photos/60"
              alt="playlist"
              className={styles.playlist_image}
            />
            <p className={styles.playlist_name}>Playlist name</p>
          </div>
          <div className={styles.playlist}>
            <img
              src="https://picsum.photos/60"
              alt="playlist"
              className={styles.playlist_image}
            />
            <p className={styles.playlist_name}>Playlist name</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSection;