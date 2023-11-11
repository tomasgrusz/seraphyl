const PlayerModel = (props: any) => {
  return (
    <group {...props} dispose={null}>
      <mesh castShadow>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color={'#fff'} emissive={'#fff'} />
      </mesh>
    </group>
  );
};

export default PlayerModel;
