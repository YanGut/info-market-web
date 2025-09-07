
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          InfoMarket
        </Link>
      </nav>
    </header>
  );
}
