
import React from 'react';
import { MoonLoader } from 'react-spinners';
import styles from './loader.module.scss'

interface LoaderProps {
    isOpen: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isOpen }) => {
  return (
    <div className={`${styles.loader} ${isOpen ? styles.active : styles.inactive}`}>
        <MoonLoader 
            color='#022f6b' 
            cssOverride={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            loading={isOpen}
        />
    </div>
  )
}

export default Loader;