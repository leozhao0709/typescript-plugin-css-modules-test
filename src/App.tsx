import React from 'react';
import styles from './App.module.scss';
import img1 from './assets/images/smallImage.png';
import svg1 from './assets/svg/svg1.svg';

const App: React.FC<any> = () => {
  return (
    <div className={styles.App}>
      <h1>Test Project</h1>
      <img src={img1} alt="img1" />
      <img src={svg1} alt="svg1" />
    </div>
  );
};

export default App;
