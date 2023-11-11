'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import styles from './Scene.module.scss';
import {
  Float,
  Html,
  OrbitControls,
  OrbitControlsProps,
  PerformanceMonitor,
  PerspectiveCamera,
  Stars,
  Text,
} from '@react-three/drei';
import Portal from '../Portal';
import { Suspense, useEffect, useRef, useState } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { GiMagicPortal } from 'react-icons/gi';
import CountUp from 'react-countup';
import MagicSwitch from '../MagicSwitch';
import { ConvexHullCollider, MeshCollider, Physics, RigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';
import Player from '@components/Player';

const Scene = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const orbitRef = useRef(null!);
  const cameraRef = useRef(null!);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPortalActive, setIsPortalActive] = useState<boolean>(false);
  const portalRef = useRef(null!);
  const playerRef = useRef(null!);

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

  return (
    <Physics gravity={[0, -10, 0]} interpolate={false}>
      <color attach='background' args={['#211134']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Float speed={2} rotationIntensity={0.1} floatIntensity={1}>
      <RigidBody gravityScale={0}>
        <MeshCollider type='trimesh'>
          <group position={[0, 0, 0]} ref={portalRef} scale={1} rotation={[0, Math.PI / 2, 0]}>
            <Portal enabled={isPortalActive} />
          </group>
        </MeshCollider>
      </RigidBody>
      <Player />
      </Float>
      <Text position={[0, 5, 0]} rotation={[0, - Math.PI / 2, 0]} font={'/fonts/Summer/Summer.otf'} fontSize={2}>
        Seraphyl
      </Text>
      <Html transform position={[0, 0, 0]} rotation={[0, - Math.PI / 2, 0]}>
        <motion.div
          className={styles.border}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* {isHovered && (
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
          </motion.div> */}
        </motion.div>
      </Html>
      <OrbitControls />
      <PerspectiveCamera ref={cameraRef} makeDefault position={[-20, 0, 0]} />
    </Physics>
  );
};

const SceneWrapper = () => (
  <div className={styles.Scene}>
    <Canvas shadows>
      <Suspense>
        <PerformanceMonitor onChange={(api) => console.log(api)}/>
        <Scene />
      </Suspense>
    </Canvas>
  </div>
);

export default SceneWrapper;
