import styles from "../styles/About.module.css";
import headerStyles from "../styles/Header.module.css";
import { formatDateForTimeline } from "../utils/DateUtils";

type IEvent = {
  title: string;
  subtitle: string;
  startDate: Date;
  endDate?: Date;
};

type ITimeline = {};

export const Timeline: React.FC<ITimeline> = ({ children }) => (
  <>
    <hr />
    <h1 className={headerStyles.title}>Experience</h1>
    <div className={styles.container}>
      <ul className={styles.timeline}>{children}</ul>
    </div>
  </>
);

export const Event: React.FC<IEvent> = ({
  title,
  subtitle,
  startDate,
  endDate,
  children,
}) => (
  <li className={styles.event}>
    <label className={styles.icon}></label>
    <div className={styles.body}>
      <p className={styles.date}>
        {formatDateForTimeline(startDate)}
        {" - "}
        {formatDateForTimeline(endDate)}
      </p>
      <h3>{title}</h3>
      <h4>{subtitle}</h4>
      <div className={styles.description}>{children}</div>
    </div>
  </li>
);
