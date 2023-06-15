import React from 'react';
import rssLogo from '../../Assets/rs_logo.svg';
import gitLogo from '../../Assets/git_logo.svg';
import { styles } from '../styles';
export function Footer() {
  return (
    <footer style={styles.footer}>
      <a target="_blank" href="https://rs.school/js/">
        <img style={{ height: '50px' }} src={rssLogo} alt="RS schol" />
      </a>
      <p>2023</p>
      <div style={{ display: 'flex', gap: '5px' }}>
        <img style={{ height: '50px' }} src={gitLogo} alt="Git Logo" />
        <div>
          <a href="https://github.com/Surgeon83b" target="_blank">
            Kanstantsin Piatkevich
          </a>
          <br />
          <a href="https://github.com/AmdreiMash" target="_blank">
            Andrei Mashedo
          </a>
        </div>
      </div>
    </footer>
  );
}
