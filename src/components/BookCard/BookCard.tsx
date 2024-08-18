import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './bookcard.module.scss';
import heart from '@assets/icons/heart.png';
import redheart from '@assets/icons/redheart.png';

type BookCardType = {
    id: number;
    title: string;
    author: string;
    cover: string;
    description: string;
    publicationDate: string;
    addToFavourites: (id: number) => void;
    liked: boolean;
    createdByUser?: boolean;
    bookData?: any;
}

const BookCard: React.FC<BookCardType> = ({ id, title, author, cover, description, publicationDate, addToFavourites, liked, createdByUser }) => {
  const navigate = useNavigate();
  const likeIcon = liked ? redheart : heart;
  const bookData = {
    title,
    author,
    cover,
    description,
    publicationDate
  }

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
          <p className={styles.desc} onClick={() => navigate(`/${id}`, { state: { book: bookData, createdByUser } })}>
            {`Explore more >`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BookCard;
