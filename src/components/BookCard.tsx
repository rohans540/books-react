import React from "react";
import { formatDate } from "src/utils";
import styles from './bookcard.module.scss';

type BookCardType = {
    id: number;
    title: string;
    author: string;
    description: string;
    cover: string;
    publicationDate: string
}

const BookCard: React.FC<BookCardType> = ({ id, title, author, description, cover, publicationDate }) => {

  return (
    <div className={styles.cardContainer}>
      <div className={styles.coverContainer}>
        <img 
          src={cover}
          alt={title}
          className={styles.fullCover}
        />
      </div>

      <div className={styles.bookInfo}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.author}>{"By "+ author}</p>
        <p className={styles.date}>{"Published: "+formatDate(publicationDate)}</p>
        <p className={styles.desc}>{description.slice(0, 30)+'...'}</p>
      </div>
    </div>
  )
}

export default BookCard