import BookCard from '@components/BookCard'
import React from 'react'
import useGetBooksList from 'src/hooks/useGetBooksList'
import styles from './home.module.scss';

const Home = () => {
  const { books } = useGetBooksList();
  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.heading}>Books</h2>
      <div className={styles.cardContainer}>
        {books && books.length && books.map((book, index) => (
          <BookCard 
            key={book?.id}
            { ...book }
          />
          )) }
      </div>
    </div>
  )
}

export default Home