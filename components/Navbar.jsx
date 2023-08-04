"use client";
import styles from "./Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = (props) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const submenuRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (submenuRef.current && !submenuRef.current.contains(e.target)) {
        setOpenSubmenu(false);
      }
    };
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.navigational_bar}>
      <div className={styles.left_section}>
        <div className={styles.navigational_arrows}>
          <span onClick={() => router.back()}>
            <i className="bi bi-chevron-left"></i>
          </span>
          <span onClick={() => router.forward()}>
            <i className="bi bi-chevron-right"></i>
          </span>
        </div>
        {props.page === "search" && (
          <div className={styles.searchBar}>
            <span className={styles.search_icon}>
              <i className="bi bi-search"></i>
            </span>
            <input type="text" placeholder="What do you want to listen?" />
          </div>
        )}
      </div>
      {session?.user ? (
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
                    <Link href={`/profile/${session?.user.id}`}>Profile</Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      onClick={async () => {
                        await signOut();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </span>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className={styles.signin}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Navbar;
