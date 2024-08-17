import React from 'react';
import styles from './custominput.module.scss'

interface Props {
    value: string;
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    inputType: string;
    name: string;
    placeHolder: string;
    isTextArea?: boolean;
    error?: string;
    onBlur?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    max?: string;
}

const CustomInput = ({ value, handleChange, inputType, name, placeHolder, isTextArea, error = '', onBlur = () => {}, max }: Props) => {
  if(isTextArea) {
    return (
      <textarea 
            required
            value={value}
            onChange={handleChange}
            rows={5}
            name={name}
            placeholder={placeHolder}
            className={styles.textArea}
          />
    )
  } else {
    return (
      <>
        <input 
            className={styles.inputStyle}
            required
            value={value}
            onChange={handleChange}
            type={inputType}
            name={name}
            placeholder={placeHolder}
            onBlur={onBlur}
            max={inputType === 'date' ? max : ""}
        />
        {error && <p className={styles.errorStyle}>{error}</p>}
      </>
    )
  }
}

export default CustomInput;