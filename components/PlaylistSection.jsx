"use client";
import styles from "./PlaylistSection.module.css";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

const PlaylistSection = () => {
  const [submenu, setSubmenu] = useState(false);
  const submenuRef = useRef(null);
  const { data: session } = useSession();
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (submenuRef.current && !submenuRef.current.contains(e.target)) {
        setSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
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
            <i
              className={`bi bi-plus ${styles.add}`}
              title="create new playlist"
            ></i>
          </span>
        </div>
        {session?.user && (
          <div className={styles.options}>
            <p className={styles.options_button}>Playlists</p>
            <p className={styles.options_button}>Artists</p>
          </div>
        )}
      </div>
      {session?.user && session.user.playlists ? (
        <div className={styles.playlists_artists}>
          <div className={styles.top_bar}>
            <span className={styles.search_icon}>
              <i className="bi bi-search"></i>
            </span>
            <div
              className={styles.sort_options}
              ref={submenuRef}
              onClick={() => setSubmenu((prev) => !prev)}
            >
              <p className={styles.sort_option}>Recents</p>
              <span className={styles.options_arrow}>
                <i
                  className={
                    submenu ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"
                  }
                ></i>
              </span>
              {submenu && (
                <div className={styles.submenu}>
                  <ul>
                    <li>Recents</li>
                    <li>Recently Added</li>
                    <li>Alphabetical</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className={styles.playlists}>
            {session.user.playlists.map((playlist) => (
              <div className={styles.playlist} key={playlist.id}>
                <img
                  src="https://picsum.photos/60"
                  alt="playlist"
                  className={styles.playlist_image}
                />
                <p className={styles.playlist_name}>{playlist.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.createPlaylist}>
          <h4>Create your first playlist</h4>
          <p>It's easy - we'll help you.</p>
          <button className={styles.createButton}>Create Playlist</button>
        </div>
      )}
    </div>
  );
};

export default PlaylistSection;
