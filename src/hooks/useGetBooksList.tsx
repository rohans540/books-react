import axios from 'axios';
import { useEffect, useState } from 'react'
import { BOOKS_API_URL } from '../constants';

const useGetBooksList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooksList = async () => {
            try {
                const response = await axios.get(BOOKS_API_URL);
                if(response?.status === 200) {
                    setBooks(response?.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getBooksList();
    }, [])

    return {
        books
    }
  
}

export default useGetBooksList