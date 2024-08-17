import React from 'react';
import styles from './custombutton.module.scss';

interface Props {
    btnType?: "button" | "submit" | "reset";
    title: string;
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
    styles?: string;
    disabled?: boolean;
}

const Custombutton = ({ btnType, title, handleClick, disabled = false }: Props) => {
    return (
      <button
        type={btnType}
        className={styles.btn}
        onClick={handleClick}
        disabled={disabled}
      >
          {title}
      </button>
    )
  }

export default Custombutton;