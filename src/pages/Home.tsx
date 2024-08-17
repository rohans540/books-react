import { BookCard, CustomButton, PopForm } from '@components/index'
import React, { useState } from 'react'
import useGetBooksList from 'src/hooks/useGetBooksList'
import styles from './home.module.scss';

const Home = () => {
  const { books, setBooks, currentPage, totalPages, goToNextPage, goToPreviousPage } = useGetBooksList(5);
  const [isVisible, setIsVisible] = useState(false);
  const addToFavourites = (bookId: string) => {
    const favouritesString = localStorage.getItem('favourites');
    let favourites: string[] = favouritesString ? JSON.parse(favouritesString) : [];

  if (favourites.includes(bookId)) {
    favourites = favourites.filter(id => id !== bookId);
  } else {
    favourites.push(bookId);
  }

  localStorage.setItem('favourites', JSON.stringify(favourites));

  setBooks(prevBooks =>
    prevBooks.map(book =>
      book.id === bookId ? { ...book, liked: !book.liked } : book
    )
  );
}
  return (
    <div className={styles.homeContainer}>
      <div className={styles.headContent}>
        <h2 className={styles.heading}>Books</h2>
        <CustomButton 
          title='Create new'
          handleClick={() => setIsVisible(true)}
          btnType='button'
        />
      </div>
      <div className={styles.cardContainer}>
        {books && books.length && books.map((book, index) => (
          <BookCard 
            key={book?.id}
            addToFavourites={addToFavourites}
            { ...book }
          />
          )) }
      </div>
      <div className={styles.pagination}>
        <CustomButton 
          title='Previous'
          handleClick={goToPreviousPage}
          btnType='button'
          disabled={currentPage === 1}
        />
        <span className={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>

        <CustomButton 
          title='Next'
          handleClick={goToNextPage}
          btnType='button'
          disabled={currentPage === totalPages}
        />
      </div>
      <PopForm 
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        setBooks={setBooks}
      />
    </div>
  )
}

export default Home