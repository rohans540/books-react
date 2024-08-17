import axios from 'axios';
import { useEffect, useState } from 'react'
import { BOOKS_API_URL } from '../constants';

const useGetBooksList = (itemsPerPage: number) => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getBooksList = async () => {
            try {
                const response = await axios.get(BOOKS_API_URL);
                if(response?.status === 200) {
                    const favouritesString = localStorage.getItem('favourites');
                    const favourites: string[] = favouritesString ? JSON.parse(favouritesString) : [];
                    const updatedBooks = response.data.map(book => ({
                        ...book,
                        liked: favourites.includes(book.id),
                      }));
                    setBooks(updatedBooks);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getBooksList();
    }, [])
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = books.slice(startIndex, endIndex);

    const totalPages = Math.ceil(books.length / itemsPerPage);

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToPage = (page: number) => {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    };

    return {
        books: paginatedBooks,
        totalPages,
        currentPage,
        goToNextPage,
        goToPreviousPage,
        goToPage,
        setBooks
    }
  
}

export default useGetBooksList