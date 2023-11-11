import { KeyboardControls, Sparkles, Stars } from '@react-three/drei';
import PlayerModel from './Player.model';
import Ecctrl from 'ecctrl';
import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { SpotLight } from 'three';

const Player = () => {
  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ];
  const playerRef = useRef(null!);
  const glowRef = useRef<SpotLight>(null!);

  return (
    <KeyboardControls map={keyboardMap}>
      {/* @ts-ignore */}
      {/* <Ecctrl debug> */}
        <RigidBody
          // ref={api}
          
          position={[0, 5, 0]}
          friction={0.5}
          restitution={0.5}
          colliders="ball"
        >
          <Sparkles
            count={100}
            scale={0.25}
            color={'#aaf'}
            size={3}
            speed={0}
            noise={[0,10,0]}
          />
          <spotLight ref={glowRef} color={'white'} intensity={10} position={[0, 0, 0]}/>
          <PlayerModel ref={playerRef} />
        </RigidBody>
      {/* </Ecctrl> */}
    </KeyboardControls>
  );
};

export default Player;
