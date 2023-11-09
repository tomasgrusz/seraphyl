'use client';

import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import styles from './Scene.module.scss';
import {
  Html,
  OrbitControls,
  OrbitControlsProps,
  PerspectiveCamera,
  Text,
} from '@react-three/drei';
import Portal from '../Portal';
import { useEffect, useRef, useState } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { GiMagicPortal } from 'react-icons/gi';
import CountUp from 'react-countup';
import MagicSwitch from '../MagicSwitch';

const Scene = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const orbitRef = useRef(null!);
  const cameraRef = useRef(null!);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPortalActive, setIsPortalActive] = useState<boolean>(false);
  const portalRef = useRef(null!);

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  useEffect(() => {
    const diffX = coords.x - window.innerWidth / 2;
    const directionX = diffX > 0 ? -1 : 1;
    const distanceX = Math.abs(diffX) / (window.innerWidth / 2);
    const diffY = coords.y - window.innerHeight / 2;
    const directionY = diffY > 0 ? -1 : 1;
    const distanceY = Math.abs(diffY) / (window.innerHeight / 2);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    orbitRef.current?.setAzimuthalAngle((distanceX * directionX * Math.PI) / 6);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // orbitRef.current?.setPolarAngle((distanceY * directionY * Math.PI) / 3);
    orbitRef.current?.setPolarAngle(Math.PI / 2 + (distanceY * directionY * Math.PI) / 6);
  }, [coords, orbitRef]);

  return (
    <div className={styles.Scene}>
      <Canvas shadows>
        <color attach='background' args={['#211134']} />
        <group position={[0, -5, -10]} ref={portalRef}>
          <Portal enabled={isPortalActive} />
        </group>
        <Text position={[0, -6.5, 7.5]} font={'/fonts/Summer/Summer.otf'} fontSize={2}>
          Seraphyl 182
        </Text>
        <Html transform position={[0, 0, 0]}>
          <motion.div
            className={styles.border}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {isHovered && (
              <motion.div
                className={styles.hearts}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                <BsFillHeartFill /> <CountUp end={205} duration={3} />
              </motion.div>
            )}
            {isHovered && (
              <motion.div
                className={styles.div}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.85 }}
              ></motion.div>
            )}
            {isHovered && (
              <motion.button
                className={styles.button}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.05 }}
                onHoverStart={() => setIsPortalActive(true)}
                onHoverEnd={() => setIsPortalActive(false)}
              >
                <GiMagicPortal /> Explore More
              </motion.button>
            )}
            <motion.div className={styles.switch}>
              <MagicSwitch />
            </motion.div>
          </motion.div>
        </Html>
        <OrbitControls
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
          maxZoom={1}
          minZoom={0.5}
          ref={orbitRef}
        />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 40]} zoom={0.75} />
      </Canvas>
    </div>
  );
};

export default Scene;
