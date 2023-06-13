"use client";
import styles from "./Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Navbar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const submenuRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (submenuRef.current && !submenuRef.current.contains(e.target)) {
        setOpenSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.navigational_bar}>
      <div className={styles.navigational_arrows}>
        <span>
          <i className="bi bi-chevron-left"></i>
        </span>
        <span>
          <i className="bi bi-chevron-right"></i>
        </span>
      </div>
      <div className={styles.right_section}>
        <button type="button">Upgrade</button>
        <span
          className={styles.profile_btn}
          onClick={() => setOpenSubmenu((prev) => !prev)}
        >
          <i className="bi bi-person"></i>
          {openSubmenu && (
            <div className={styles.submenu} ref={submenuRef}>
              <ul>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/settings">Settings</Link>
                </li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
