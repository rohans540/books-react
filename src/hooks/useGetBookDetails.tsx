import axios from "axios";
import { useState, useEffect } from "react";
import { BOOKS_API_URL } from "src/constants";

const useGetBookDetails = (bookId: string, createdByUser: boolean) => {
    const [bookDetails, setBookDetails] = useState({})

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                const resp = await axios.get(`${BOOKS_API_URL}/${bookId}`);
                if(resp.status === 200) {
                    setBookDetails(resp.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    if(createdByUser) return;
    else
        getBookDetails();
    }, [bookId, createdByUser])

    return {
        bookDetails,
        setBookDetails
    }
};

export default useGetBookDetails;