import React, { forwardRef, Ref } from 'react';
import styles from './custominput.module.scss';

interface Props {
  inputType: string;
  name: string;
  placeHolder: string;
  isTextArea?: boolean;
  error?: string;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  max?: string;
}

const CustomInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  Props
>(
  (
    { inputType, name, placeHolder, isTextArea, error = '', max = '', onBlur },
    ref
  ) => {
    if (isTextArea) {
      return (
        <textarea
          ref={ref as Ref<HTMLTextAreaElement>}
          name={name}
          placeholder={placeHolder}
          className={styles.textArea}
          onBlur={onBlur}
        />
      );
    } else {
      return (
        <>
          <input
            ref={ref as Ref<HTMLInputElement>}
            type={inputType}
            name={name}
            placeholder={placeHolder}
            className={styles.inputStyle}
            max={inputType === 'date' ? max : ''}
            onBlur={onBlur}
          />
          {error && <p className={styles.errorStyle}>{error}</p>}
        </>
      );
    }
  }
);

export default CustomInput;
