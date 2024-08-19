export type BookCardType = {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  publicationDate: string;
  addToFavourites: (id: string) => void;
  liked: boolean;
  createdByUser?: boolean;
  bookData?: Book;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    cover: string;
    publicationDate: string;
    description: string;
    liked: boolean;
    createdByUser?: boolean;
  }

export type BookState = Book | null;

export interface VisibilityState {
    visible: boolean;
    type: string;
}

