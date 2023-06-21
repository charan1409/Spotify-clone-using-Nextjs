"use client";
import styles from "./OverlayFormSection.module.css";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

const OverlayFormSection = ({ content, closeOverlay, userdata }) => {
  const imageInputRef = useRef(null);
  const overlayContentRef = useRef(null);
  const { data: session } = useSession();

  const [inputKey, setInputKey] = useState("");

  const [playlistInfo, setPlaylistInfo] = useState({
    playlistName: "",
    playlistDescription: "",
    playlistImage: "",
  });
  const [name, setName] = useState(`${userdata ? userdata.username : ""}`);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        overlayContentRef.current &&
        !overlayContentRef.current.contains(e.target)
      ) {
        closeOverlay();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handlePlaylistSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Spotify_Clone_Pics");
    try {
      if (playlistInfo.playlistName === "") {
        alert("Please enter a playlist name");
        return;
      }
      if (playlistInfo.playlistImage !== "") {
        const { secure_url } = await fetch(
          "https://api.cloudinary.com/v1_1/dfw9gsnzx/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());
        setPlaylistInfo({ ...playlistInfo, playlistImage: secure_url });
      }
      const data = {
        playlistName: playlistInfo.playlistName,
        playlistDescription: playlistInfo.playlistDescription,
        playlistImage: playlistInfo.playlistImage,
        userId: session?.user.id,
      };
      alert(playlistInfo.userId);
      console.log(playlistInfo);
      const res = await fetch("/api/playlist", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        closeOverlay();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPlaylistInfo({
        playlistName: "",
        playlistDescription: "",
        playlistImage: "",
      });
      setImage(null);
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    alert(useinfo);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent} ref={overlayContentRef}>
        <div className={styles.overlayHeader}>
          <h2>{content}</h2>
          <span className={styles.closeBtn} onClick={closeOverlay}>
            <i className="bi bi-x"></i>
          </span>
        </div>
        {session?.user && (
          <>
            <div className={styles.overlayBody}>
              <form onSubmit={handlePlaylistSubmit}>
                <div className={styles.inputSection}>
                  <div className={styles.imageInput}>
                    <input
                      type="file"
                      key={inputKey}
                      name="playlistImage"
                      id="playlistImage"
                      accept="image/*"
                      ref={imageInputRef}
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setInputKey(Date.now());
                      }}
                    />
                    {image !== null && (
                      <img src={URL.createObjectURL(image)} alt="playlist" />
                    )}
                    <div className={styles.editPhoto}>
                      <p onClick={() => imageInputRef.current.click()}>
                        Choose photo
                      </p>
                      <p
                        onClick={() => {
                          setImage(null);
                          setInputKey(Date.now());
                        }}
                      >
                        Remove photo
                      </p>
                    </div>
                  </div>
                  <div className={styles.rightSection}>
                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Playlist name"
                        value={name}
                        onChange={(e) =>
                          setPlaylistInfo({
                            ...playlistInfo,
                            playlistName: e.target.value,
                          })
                        }
                      />
                    </div>
                    {content !== "Edit profile" && (
                      <div className={styles.formGroup}>
                        <textarea
                          name="playlistDescription"
                          id="playlistDescription"
                          placeholder="Add an optional description"
                          value={playlistInfo.playlistDescription}
                          onChange={(e) =>
                            setPlaylistInfo({
                              ...playlistInfo,
                              playlistDescription: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
                <button className={styles.createBtn}>Save</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OverlayFormSection;
