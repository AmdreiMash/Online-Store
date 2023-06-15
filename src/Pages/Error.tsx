import React from 'react';
import { styles } from '../components/styles';
import { Link } from 'react-router-dom';

export const Page404 = () => {
  return (
    <div style={styles[404]}>
      <Link to="/">Home</Link>
    </div>
  );
};
