"use client";
import Navbar from "@/components/Navbar";
import styles from "../Profile.module.css";
import OverlayFormSection from "@/components/OverlayFormSection";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const page = () => {
  const [overlay, setoverlay] = useState(false);
  const { userId } = useParams();
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    const response = await fetch(`/api/profile/${userId}`);
    const data = await response.json();
    return setUserData(data);
  };
  return (
    <div>
      <Navbar page={"profile"} />
      <div className={styles.profileSection}>
        <div className={styles.profilePic}>
          {/* <img src="https://picsum.photos/300" alt="profile" /> */}
        </div>
        <div className={styles.profileInfo}>
          <h1>{userData.username}</h1>
          <p>
            {userData?.following?.length && userData.following.length} following
          </p>
          <button
            type="button"
            className={styles.editProfile}
            onClick={() => setoverlay(true)}
          >
            <i className="bi bi-pencil-square"></i>Edit profile
          </button>
        </div>
      </div>
      <div className={styles.followingSection}>
        <div className={styles.header}>
          <h1>Following</h1>
          <p>show all</p>
        </div>
      </div>
      {overlay && (
        <OverlayFormSection
          content="Edit profile"
          closeOverlay={() => setoverlay(false)}
          formdata={userData}
          updateProfile={fetchUserData}
        />
      )}
    </div>
  );
};

export default page;
