import React from "react";
import styles from './bookcard.module.scss';
import heart from '@assets/icons/heart.png';
import redheart from '@assets/icons/redheart.png';

type BookCardType = {
    id: number;
    title: string;
    author: string;
    description: string;
    cover: string;
    publicationDate: string
}

const BookCard: React.FC<BookCardType> = ({ id, title, author, description, cover, publicationDate, addToFavourites, liked }) => {

  const likeIcon = liked ? redheart : heart;

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
        <div className={styles.cardNavWrapper}>
          <img 
            src={likeIcon}
            alt="Heart"
            className={styles.heartImg}
            onClick={() => addToFavourites(id)}
          />
          <p className={styles.desc}>{`Explore more >`}</p>
        </div>
        
      </div>
    </div>
  )
}

export default BookCard