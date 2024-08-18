import React from 'react';
import CustomInput from '@components/CustomInput/CustomInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './popform.module.scss';
import Custombutton from '@components/CustomButton/CustomButton';

interface PopoverModalProps {
  isVisible: boolean;
  onClose: () => void;
  setBooks: React.MouseEventHandler<HTMLButtonElement>;
}

interface BookFormInputs {
  title: string;
  author: string;
  cover: string;
  description: string;
  publicationDate: string;
}

const PopForm: React.FC<PopoverModalProps> = ({ isVisible, onClose, setBooks }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInputs>();

  if (!isVisible) return null;

  const onSubmit: SubmitHandler<BookFormInputs> = (data) => {
    setBooks((prevBooks) => {
        const newBooks = [...prevBooks, { ...data, id: prevBooks.length+1 }]
        return newBooks;
    })
    onClose();
    reset();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.heading}>Add new book</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            inputType="text"
            placeHolder="Enter book title"
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />
          <CustomInput
            inputType="text"
            placeHolder="Enter Author's name"
            error={errors.author?.message}
            {...register('author', { required: 'Author name is required' })}
          />
          <CustomInput
            inputType="text"
            placeHolder="Enter cover url"
            error={errors.cover?.message}
            {...register('cover', { required: 'Cover URL is required' })}
          />
          <CustomInput
            inputType="date"
            placeHolder="Publication date"
            max={new Date().toISOString().split('T')[0]}
            error={errors.publicationDate?.message}
            {...register('publicationDate', { required: 'Publication date is required' })}
          />
          <CustomInput
            inputType="text"
            placeHolder="Description"
            error={errors.description?.message}
            {...register('description', { required: 'Description is required' })}
            isTextArea
          />
          <div className={styles.btnContainer}>
            <Custombutton 
                btnType='submit'
                handleClick={() => {}}
                title='Add'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopForm;
