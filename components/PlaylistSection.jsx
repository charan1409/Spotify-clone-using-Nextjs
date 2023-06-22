"use client";
import styles from "./PlaylistSection.module.css";
import { useState, useEffect, useRef } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import OverlayFormSection from "./OverlayFormSection";

const PlaylistSection = () => {
  const [providers, setProviders] = useState(null);
  const [submenu, setSubmenu] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [overlay, setoverlay] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const submenuRef = useRef(null);
  const loginPopupRef = useRef(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (submenuRef.current && !submenuRef.current.contains(e.target)) {
        setSubmenu(false);
      }
      if (loginPopupRef.current && !loginPopupRef.current.contains(e.target)) {
        setLoginPopup(false);
      }
    };
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
    const fetchPlaylists = async () => {
      const response = await fetch(`/api/playlist/${session?.user.id}`);
      const data = await response.json();
      return setPlaylists(data);
    };
    fetchPlaylists();
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const closeOverlay = () => {
    setoverlay(false);
  };

  const updatePlaylists = async () => {
    const response = await fetch(`/api/playlist/${session?.user.id}`);
    const data = await response.json();
    return setPlaylists(data);
  };

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
              onClick={() => {
                if (session?.user) {
                  setLoginPopup(false);
                  setoverlay(true);
                } else {
                  setLoginPopup(true);
                }
              }}
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
      {session?.user && playlists.length !== 0 ? (
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
            {playlists.map((playlist) => (
              <div className={styles.playlist} key={playlist._id}>
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
          <button
            className={styles.createButton}
            onClick={() => {
              if (session?.user) {
                setLoginPopup(false);
                setoverlay(true);
              } else {
                setLoginPopup(true);
              }
            }}
          >
            Create Playlist
          </button>
        </div>
      )}
      {!session?.user && loginPopup && (
        <div className={styles.login_popup} ref={loginPopupRef}>
          <div className={styles.login_popup_content}>
            <div className={styles.login_popup_header}>
              <h4 className={styles.login_popup_heading}>Login</h4>
              <span
                className={styles.login_popup_close}
                onClick={() => setLoginPopup(false)}
              >
                &times;
              </span>
            </div>
            <div className={styles.login_popup_body}>
              <p className={styles.login_popup_text}>
                To create a playlist, you need to login first.
              </p>
              <div className={styles.loginPopupBtns}>
                <button
                  className={styles.not_now_button}
                  onClick={() => setLoginPopup(false)}
                >
                  Not now
                </button>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                      <button
                        className={styles.login_popup_button}
                        onClick={() => signIn(provider.id)}
                      >
                        Sign in with {provider.name}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {overlay && (
        <OverlayFormSection
          content={"Create playlist"}
          closeOverlay={closeOverlay}
          updatePlaylists={updatePlaylists}
        />
      )}
    </div>
  );
};

export default PlaylistSection;
