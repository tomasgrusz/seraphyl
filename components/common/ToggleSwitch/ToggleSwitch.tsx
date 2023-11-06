import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = ({
  toggle,
  setToggle,
  color,
  size,
}: {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string;
  size?: number;
}) => {
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div
        className={`${styles.ToggleSwitch} ${toggle ? styles.toggled : ''}`}
        onClick={toggleHandler}
        style={{
          backgroundColor: color ? color : '#aaf',
          width: size ? size : '4rem',
          height: size ? size * 0.5 : '2rem',
          borderRadius: size ? size * 0.25 : '1rem',
        }}
      >
        <span
          className={`${styles.ToggleCircle} ${toggle ? styles.toggled : ''}`}
          style={{
            height: size ? size * 0.4 : '1.6rem',
            width: size ? size * 0.4 : '1.6rem',
            margin: size ? size * 0.05 : '0.2rem',
          }}
        ></span>
      </div>
    </>
  );
};

export default ToggleSwitch;
