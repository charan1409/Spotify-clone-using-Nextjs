"use client";
import styles from "./HomeSection.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeSection = (props) => {
  const path = usePathname();
  return (
    <div className={styles.home_section}>
      <Link
        href="/"
        className={`${styles.heading} ${
          path === "/" ? styles.active : ""
        }`}
      >
        <span className={styles.icons}>
          <i className={`${path === "/" ? "bi bi-house-door-fill" : "bi bi-house-door"}`}></i>
        </span>
        Home
      </Link>
      <Link
        href="/search"
        className={`${styles.heading} ${
          path === "/search" ? styles.active : ""
        }`}
      >
        <span className={styles.icons}>
          <i className="bi bi-search"></i>
        </span>
        Search
      </Link>
    </div>
  );
};

export default HomeSection;
