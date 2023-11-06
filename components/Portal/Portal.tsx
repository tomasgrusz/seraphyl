import { Sparkles, useGLTF, Float, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { Portal as Model } from './Portal.model';
import { CylinderGeometry, Mesh, MeshBasicMaterial, SpotLight, SpotLightHelper } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Frame: THREE.Mesh;
    PortalStair1: THREE.Mesh;
    PortalStair2: THREE.Mesh;
    Portal: THREE.Mesh;
  };
};

const Portal = ({ enabled }: { enabled: boolean }) => {
  const { nodes } = useGLTF('/assets/portal.glb') as GLTFResult;
  const portalRef = useRef<Mesh>(null!);
  const light1 = useRef<SpotLight>(null!);
  const light2 = useRef<SpotLight>(null!);
  // useHelper(light2, SpotLightHelper, '#aaf');

  const portalLightTarget = new Mesh(new CylinderGeometry(0, 0, 0, 0), new MeshBasicMaterial({}));
  portalLightTarget.position.set(4, 10, 0);

  return (
    <group rotation={[0, -Math.PI / 5, 0]} dispose={null}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={1}>
        <Model castShadow receiveShadow />
        <Sparkles
          position={[4, 4, 0.5]}
          count={50}
          scale={10}
          color={'#aaf'}
          size={6}
          speed={0.2}
          noise={0.1}
        />
        <group visible={enabled}>
          <primitive object={portalLightTarget} />
          <spotLight
            penumbra={0.15}
            distance={50}
            angle={Math.PI / 3.5}
            power={100}
            intensity={0.8}
            color={'#70f'}
            position={[4, 7.75, 0.3]}
            target={portalLightTarget}
            decay={0}
          />
          <mesh
            geometry={nodes.Portal.geometry}
            material={nodes.Portal.material}
            position={[3.948, 4.317, -0.109]}
            scale={[1.182, 1, 1]}
            ref={portalRef}
          />
          <spotLight
            color={'#aaf'}
            position={[4, 1, 0.1]}
            target={portalLightTarget}
            ref={light1}
            angle={Math.PI / 2}
            power={1000}
            distance={10}
            decay={1}
          />
        </group>
        {/* Light */}
        <spotLight ref={light2} color={'#aaf'} intensity={0.5} angle={Math.PI / 2} position={[-15, 15, -10]} decay={0}/>
        <spotLight color={'#aaf'} intensity={0.75} angle={Math.PI / 4} position={[25, -2, 20]} decay={0}/>
      </Float>
      <ambientLight color={'#70f'} intensity={1} />
    </group>
  );
};

export default Portal;
