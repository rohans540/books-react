import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Book, VisibilityState, BookState } from '@assets/types';
import CustomInput from '@components/CustomInput/CustomInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './popform.module.scss';
import Custombutton from '@components/CustomButton/CustomButton';

interface PopoverModalProps {
  isVisible: VisibilityState;
  onClose: () => void;
  setBooks:  React.Dispatch<React.SetStateAction<Book[]>>;
  bookData?: BookState;
  setCurrentBook?: React.Dispatch<React.SetStateAction<BookState>>;
}

interface BookFormInputs {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  publicationDate: string;
}

const PopForm: React.FC<PopoverModalProps> = ({ isVisible, onClose, setBooks, bookData, setCurrentBook = () => {} }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInputs>();

  useEffect(() => {
    if (bookData) {
      reset(bookData);
    }
  }, [bookData, reset]);

  if (!isVisible?.visible) return null;

  const onSubmit: SubmitHandler<BookFormInputs> = (data) => {
    if (isVisible.type === 'edit') {
      setBooks((prevBooks) => {
        return prevBooks.map((book) =>
          book.id === data.id ? { ...book, ...data, liked: book.liked ?? false } : book
        );
      });
      setCurrentBook((prev) => ({ ...prev, ...data, liked: prev?.liked ?? false }))
      toast.success("Book successfully edited")
    } else {
      setBooks((prevBooks) => {
        const newBook = {
          ...data,
          id: (prevBooks.length > 0 ? (parseInt(prevBooks[prevBooks.length - 1].id) + 1).toString() : '1'),
          createdByUser: true,
          liked: false,
        };
        return [...prevBooks, newBook];
      });
      toast.success("Book successfully created")
    }
    onClose();
    reset();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.heading}>{ isVisible?.type === 'edit' ? 'Edit book' : 'Create new book' }</h2>
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
                title={isVisible?.type === 'edit' ? 'Save' : 'Create'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopForm;
