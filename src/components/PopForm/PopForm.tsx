import React from 'react'
import CustomInput from '@components/CustomInput/CustomInput';
import styles from './popform.module.scss';
import { CustomButton } from '..';

interface PopoverModalProps {
    isVisible: boolean;
    onClose: () => void;
    setBooks: React.MouseEventHandler<HTMLButtonElement>;
  }

const PopForm: React.FC<PopoverModalProps> = ({ isVisible, onClose, setBooks }) => {


    if (!isVisible) return null;

    return (
        <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={onClose}>
                &times;
            </button>
            <h2 className={styles.heading}>Add new book</h2>
            <form>
                <CustomInput 
                    value=""
                    handleChange={() => {}}
                    inputType="text"
                    name="title"
                    placeHolder="Enter book title"
                />
                <CustomInput 
                    value=""
                    handleChange={() => {}}
                    inputType="text"
                    name="authorName"
                    placeHolder="Enter Author's name"
                />
                <CustomInput 
                    value=""
                    handleChange={() => {}}
                    inputType="text"
                    name="coverUrl"
                    placeHolder="Enter cover url"
                />
                <CustomInput 
                    value=""
                    handleChange={() => {}}
                    inputType="date"
                    name="publicationDate"
                    placeHolder="Publication date"
                    max={new Date().toISOString().split('T')[0]}
                />
                <CustomInput 
                    value=""
                    handleChange={() => {}}
                    inputType="text"
                    name="description"
                    placeHolder="Description"
                    isTextArea
                />

                <div className={styles.btnContainer}>
                    <CustomButton 
                        title='Add'
                        handleClick={() => {}}
                        btnType='submit'
                    />
                </div>

            </form>
        </div>
        </div>
    );
}

export default PopForm