import { Canvas } from '@react-three/fiber';

import styles from './Scene.module.scss';
import { ReactNode } from 'react';

const Scene = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.Scene}>
      <Canvas shadows>{children}</Canvas>
    </div>
  );
};

export default Scene;
