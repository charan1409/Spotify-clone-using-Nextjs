import styles from "./HomeSection.module.css";
import Link from "next/link";

const HomeSection = () => {
  return (
    <div className={styles.home_section}>
      <Link href="/">
        <p className={styles.heading}>
          <span className={styles.icons}>
            <i className="bi bi-house-door"></i>
          </span>
          Home
        </p>
      </Link>
      <Link href="/search">
        <p className={styles.heading}>
          <span className={styles.icons}>
            <i className="bi bi-search"></i>
          </span>
          Search
        </p>
      </Link>
    </div>
  );
};

export default HomeSection;
