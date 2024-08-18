import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styles from './bookdetails.module.scss';
import useGetBookDetails from 'src/hooks/useGetBookDetails';
import { formatDate } from 'src/utils';
import { CustomButton, PopForm } from '@components/index';
import useGetBooksList from 'src/hooks/useGetBooksList';

const BookDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState({ visible: false, type: '' });
  
  // Extract book data from location.state
  const stateBook = location.state?.book;
  const createdByUser = location.state?.createdByUser;

  // Fetch book details from API if not provided by state
  const { bookDetails, setBookDetails } = useGetBookDetails(id || '', true);
  const { books, setBooks } = useGetBooksList(15);

  // Merge stateBook data with fetched bookDetails
  const bookData = stateBook || bookDetails;
  console.log(books);

  return (
    <div className={styles.bookDetailsContainer}>
      <div className={styles.actions}>
        <Link to=".." className={styles.backBtn}>{`< back`}</Link>
        {createdByUser && (
          <CustomButton 
            title='Edit'
            handleClick={() => setIsVisible((prev) => ({ ...prev, visible: true, type: 'edit' }))}
            btnType='button'
          />
        )}
      </div>
      <div className={styles.mainContent}>
        <div className={styles.coverContainer}>
            <img 
              src={bookData?.cover}
              alt={bookData?.title}
              className=''
            />
        </div>
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>Title: {bookData?.title}</h2>
          <h5 className={styles.author}>Written by: {bookData?.author}</h5>
          <h6 className={styles.date}>Published: {formatDate(bookData?.publicationDate)}</h6>
          <p className={styles.desc}>{bookData?.description}</p>
        </div>
      </div>
      <PopForm 
        isVisible={isVisible}
        onClose={() => setIsVisible((prev) => ({ ...prev, visible: false, type: '' }))}
        setBooks={setBooks}
        bookData={bookData}
      />
    </div>
  )
}

export default BookDetails;
