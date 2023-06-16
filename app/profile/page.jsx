import Navbar from "@/components/Navbar";
import styles from "./Profile.module.css";

const page = () => {
  return (
    <div>
      <Navbar page={"profile"} />
      <div className={styles.profileSection}>
        <div className={styles.profilePic}>
          {/* <img src="https://picsum.photos/300" alt="profile" /> */}
        </div>
        <div className={styles.profileInfo}>
          <h1>Charan</h1>
          <p>7 following</p>
          <button type="button" className={styles.editProfile}>
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
    </div>
  );
};

export default page;
