"use client";
import styles from "./HomeSection.module.css";
import Link from "next/link";
import { useState } from "react";

const HomeSection = () => {
  const [activeState, setActiveState] = useState("home");
  return (
    <div className={styles.home_section}>
      <Link
        href="/"
        className={`${styles.heading} ${
          activeState === "home" ? styles.active : ""
        }`}
        onClick={() => setActiveState("home")}
      >
        <span className={styles.icons}>
          <i className={`${activeState === "home" ? "bi bi-house-door-fill" : "bi bi-house-door"}`}></i>
        </span>
        Home
      </Link>
      <Link
        href="/search"
        className={`${styles.heading} ${
          activeState === "search" ? styles.active : ""
        }`}
        onClick={() => setActiveState("search")}
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
