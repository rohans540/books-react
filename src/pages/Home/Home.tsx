import { BookCard, CustomButton, PopForm, Loader } from '@components/index'
import React, { useState } from 'react'
import { VisibilityState } from '@assets/types'
import useGetBooksList from 'src/hooks/useGetBooksList'
import styles from './home.module.scss';

const Home: React.FC = () => {
  const { books, setBooks, currentPage, totalPages, goToNextPage, goToPreviousPage, loading } = useGetBooksList(5);
  const [isVisible, setIsVisible] = useState<VisibilityState>({ visible: false, type: '' });

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
          handleClick={() => setIsVisible(prev => ({ ...prev, visible: true }))}
          btnType='button'
        />
      </div>
      <div className={styles.cardContainer}>
        {books && books.map((book) => (
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
        onClose={() => setIsVisible((prev) => ({ ...prev, visible: false }))}
        setBooks={setBooks}
      />
      <Loader isOpen={loading} />
    </div>
  )
}

export default Home