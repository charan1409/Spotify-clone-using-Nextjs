"use client";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";

export default function Home() {
  const getWishes = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className={styles.home_page}>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.greeting}>
          <h1>{getWishes()}</h1>
        </div>
      </div>
    </div>
  );
}
