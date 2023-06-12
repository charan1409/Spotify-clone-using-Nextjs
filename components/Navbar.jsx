import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navigational_bar}>
      <div className={styles.navigational_arrows}>
        <span><i className="bi bi-chevron-left"></i></span>
        <span><i className="bi bi-chevron-right"></i></span>
      </div>
      <div className={styles.right_section}>
        <button type="button">Upgrade</button>
        <span><i className="bi bi-person"></i></span>
      </div>
    </div>
  );
};

export default Navbar;
