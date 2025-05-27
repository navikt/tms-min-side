import styles from "../produktkort/Produktkort.module.css";

const Chevron = () => (
  <svg
    className={styles.chevron}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fontSize="24px"
    fill="none"
    viewBox="0 0 24 24"
    focusable="false"
    role="img"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.47 5.97a.75.75 0 0 1 1.06 0l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06L14.44 12 9.47 7.03a.75.75 0 0 1 0-1.06"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default Chevron;
