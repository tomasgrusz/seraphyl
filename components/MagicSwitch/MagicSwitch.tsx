import ToggleSwitch from '@components/common/ToggleSwitch';
import { useState } from 'react';

import styles from './MagicSwitch.module.scss';

const MagicSwitch = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className={styles.MagicSwitch}>
        <div className={styles.MagicOption}>
          <label className={styles.MagicDisclaimer}>(mobile-support)</label>
          <label className={styles.MagicLabel}>Minimal</label>
          <label className={styles.MagicDescription}>Accessible experience</label>
        </div>
        <ToggleSwitch toggle={modalOpen} setToggle={setModalOpen} size={96} />
        <div className={styles.MagicOption}>
          <label className={styles.MagicDisclaimer}>(browser-only)</label>
          <label className={styles.MagicLabel}>M a g i c a l</label>
          <label className={styles.MagicDescription}>Interactive experience</label>
        </div>
      </div>
    </>
  );
};

export default MagicSwitch;
