import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { BookState } from '@assets/types';
import toast from 'react-hot-toast';
import styles from './bookdetails.module.scss';
import useGetBookDetails from 'src/hooks/useGetBookDetails';
import { formatDate } from 'src/utils';
import { CustomButton, PopForm } from '@components/index';
import useGetBooksList from 'src/hooks/useGetBooksList';

const emptyBookState: BookState = {
  id: '',
  title: '',
  author: '',
  cover: '',
  description: '',
  publicationDate: '',
  liked: false,
  createdByUser: false,
};

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentBook, setCurrentBook] = useState<BookState>(null);
  const [isVisible, setIsVisible] = useState({ visible: false, type: '' });

  const stateBook = location.state?.book;
  const createdByUser = location.state?.createdByUser;
  const { bookDetails } = useGetBookDetails(id || '', true);
  const { setBooks } = useGetBooksList(15);

  useEffect(() => {
    const bookData = stateBook || bookDetails;
    setCurrentBook(bookData);
  }, [stateBook, bookDetails]);

  const deleteBook = useCallback(() => {
    setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
    setCurrentBook(emptyBookState);
    navigate('..');
    toast.success("Book successfully deleted");
  }, [id, navigate, setBooks]);

  const handleEditClick = useCallback(() => {
    setIsVisible(prev => ({ ...prev, visible: true, type: 'edit' }));
  }, []);

  const handleClosePopForm = useCallback(() => {
    setIsVisible(prev => ({ ...prev, visible: false, type: '' }));
  }, []);

  const formattedDate = useMemo(() => formatDate(currentBook?.publicationDate), [currentBook?.publicationDate]);

  return (
    <div className={styles.bookDetailsContainer}>
      <div className={styles.actions}>
        <Link to=".." className={styles.backBtn}>{`< back`}</Link>
        {createdByUser && (
          <div className={styles.btnTray}>
            <CustomButton 
              title='Edit'
              handleClick={handleEditClick}
              btnType='button'
            />
            <CustomButton 
              title='Delete'
              handleClick={deleteBook}
              btnType='button'
            />
          </div>
        )}
      </div>
      <div className={styles.mainContent}>
        <div className={styles.coverContainer}>
          <img 
            src={currentBook?.cover}
            alt={currentBook?.title}
            className=''
          />
        </div>
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>Title: {currentBook?.title}</h2>
          <h5 className={styles.author}>Written by: {currentBook?.author}</h5>
          <h6 className={styles.date}>Published: {formattedDate}</h6>
          <p className={styles.desc}>{currentBook?.description}</p>
        </div>
      </div>
      <PopForm 
        isVisible={isVisible}
        onClose={handleClosePopForm}
        setBooks={setBooks}
        bookData={currentBook}
        setCurrentBook={setCurrentBook}
      />
    </div>
  );
}

export default BookDetails;
