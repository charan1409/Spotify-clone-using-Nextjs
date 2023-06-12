import styles from "./HomeSection.module.css";

const HomeSection = () => {
  return (
    <div className={styles.home_section}>
      <p className={styles.heading}>
        <span className={styles.icons}>
          <i className="bi bi-house-door"></i>
        </span>
        Home
      </p>
      <p className={styles.heading}>
        <span className={styles.icons}>
          <i className="bi bi-search"></i>
        </span>
        Search
      </p>
    </div>
  );
};

export default HomeSection;
