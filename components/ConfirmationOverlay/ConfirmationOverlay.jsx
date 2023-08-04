"use client";
import styles from "./ConfirmationOverlay.module.css";
import { useEffect, useRef } from "react";

const ConfirmationOverlay = ({
  confirmationMsg,
  closeOverlay,
  handleConfirmation,
  justMsg,
}) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        closeOverlay();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className={styles.overlayBackground}>
      <div className={styles.overlay} ref={overlayRef}>
        <div className={styles.overlayContent}>
          <span onClick={closeOverlay} className={styles.closeBtn}>
            <i className="bi bi-x"></i>
          </span>
          <h1>{confirmationMsg}</h1>
          {!justMsg && (
            <div className={styles.buttonContainer}>
              <button
                className={styles.buttonNo}
                onClick={() => handleConfirmation(false)}
              >
                No
              </button>
              <button
                className={styles.buttonYes}
                onClick={() => handleConfirmation(true)}
              >
                Yes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationOverlay;
