"use client";
import styles from "./OverlayFormSection.module.css";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

const OverlayFormSection = ({
  content,
  closeOverlay,
  formdata,
  updatePlaylists,
  updateProfile
}) => {
  const imageInputRef = useRef(null);
  const overlayContentRef = useRef(null);
  const { data: session } = useSession();

  const [inputKey, setInputKey] = useState("");
  const [fname, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        overlayContentRef.current &&
        !overlayContentRef.current.contains(e.target)
      ) {
        closeOverlay();
      }
    };
    if (content === "Edit profile") {
      setName(formdata.username);
      setImageURL(formdata.profilePic);
    } else if (content === "edit playlist") {
      setName(formdata.playlistName);
      setDescription(formdata.playlistDescription);
      setImageURL(formdata.playlistImage);
    } else {
      setName("");
      setDescription("");
      setImage(null);
      setImageURL("");
    }
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
      if (fname === "") {
        alert("Please enter a name");
        return;
      }
      if (image !== "") {
        const { secure_url } = await fetch(
          "https://api.cloudinary.com/v1_1/dfw9gsnzx/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());
        setImageURL(secure_url);
      } else{
        setImageURL("https://picsum.photos/200");
      }
      if (content === "Edit profile") {
        const data = {
          username: fname,
          profilePic: imageURL,
          userId: session?.user.id,
        };
        const res = await fetch("/api/profile", {
          method: "PUT",
          body: JSON.stringify(data),
        });
        if (res.ok) {
          updateProfile();
          closeOverlay();
        }
      } else {
        const data = {
          playlistName: fname,
          playlistDescription: description,
          playlistImage: imageURL,
          userId: session?.user.id,
        };
        const res = await fetch("/api/playlist", {
          method: "POST",
          body: JSON.stringify(data),
        });
        if (res.ok) {
          updatePlaylists();
          closeOverlay();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setDescription("");
      setImage(null);
      setImageURL("");
    }
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
                        value={fname}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    {content !== "Edit profile" && (
                      <div className={styles.formGroup}>
                        <textarea
                          name="description"
                          placeholder="Add an optional description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
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
