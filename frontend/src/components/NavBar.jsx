import React from 'react';
import { styles } from '../styles';

const NavBar = () => {
  return (
    <nav style={styles.navbar}>
      <h3 style={styles.title}>
        Leet
        <span style={styles.titleHighlight}>Copilot</span>
      </h3>
      <div style={styles.rightHeader}>
        <div style={styles.menuDot('darkorange')}>☕︎</div>
        <div style={styles.menuDot('gray')}>☰</div>
      </div>
    </nav>
  );
}

export default NavBar;
