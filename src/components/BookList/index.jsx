import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import styles from './booklist.module.scss';
import { Link } from "react-router-dom";


function BookListApp() {

    const [list, setList] = useState([]);
    const [category, setCategory] = useState("programming");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [booksPerPage, setBooksPerPage] = useState(20);
    const API_KEY = 'AIzaSyCLIe5nB1uVG8yM84r6yTXUGVuHq3xuw2g';

    const [visiblePages, setVisiblePages] = useState(5);
    const [currentPageGroup, setCurrentPageGroup] = useState(1);

    const maxPageGroups = Math.ceil(totalPages / visiblePages);

    const firstVisiblePage = (currentPageGroup - 1) * visiblePages + 1;
    const lastVisiblePage = Math.min(currentPageGroup * visiblePages, totalPages);

    const handleNextGroup = () => {
        setCurrentPageGroup((prevGroup) => Math.min(prevGroup + 1, maxPageGroups));
    };

    const handlePreviousGroup = () => {
        setCurrentPageGroup((prevGroup) => Math.max(prevGroup - 1, 1));
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${category}&startIndex=${(currentPage - 1) * booksPerPage}&maxResults=${booksPerPage}&key=${API_KEY}`
                );
                const data = await response.json();
                const bookList = data.items;
                setList(bookList);
                setTotalPages(Math.ceil(data.totalItems / booksPerPage));
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [currentPage, category]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCharactersPerPageChange = (event) => {
        const booksPerPage = parseInt(event.target.value, 10);
        setBooksPerPage(booksPerPage);
        setCurrentPage(1);
    };

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        setCurrentPage(1);
    };

    return (
        <>
            <section>
                <div className="container">
                    <div className={styles['booklist']}>
                        <div className={styles['booklist-body']}>
                            <div className={styles['booklist-categories']}>
                                <div className={styles['booklist-title__block']}>
                                    <h1 className={styles['booklist-title']}>Books</h1>
                                </div>
                                <div>
                                    <select
                                        name="select"
                                        id="select"
                                        className={styles['select']}
                                        value={category}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="#" disabled selected>
                                            Categories
                                        </option>
                                        <option value="programming">Programming</option>
                                        <option value="sport">Sport</option>
                                        <option value="history">History</option>
                                        <option value="game">Game</option>
                                        <option value="psychology">Psychology</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles['booklist-wrapper']}>
                                {list?.map((book) => {
                                    if (book.volumeInfo.imageLinks) {
                                        return (
                                            <div className={styles['booklist-card']} key={book.id}>
                                                <Link to={`/book/${book.id}`} className={styles['booklist-card-link']}>
                                                    <div>
                                                        <img
                                                            className={styles['booklist-img']}
                                                            src={book.volumeInfo.imageLinks.thumbnail}
                                                            alt={book.volumeInfo.title}
                                                        />
                                                    </div>
                                                </Link>
                                                <div>
                                                    <h2 className={styles['booklist-name']}>
                                                        <span className={styles['booklist-card__titels']}>Name :</span>{' '}
                                                        {book.volumeInfo.title}
                                                    </h2>
                                                    <p className={styles['booklist-author']}>
                                                        <span className={styles['booklist-card__titels']}>Author :</span>{' '}
                                                        {book.volumeInfo.authors?.[0]}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <div className={styles['pagination']}>
                                {currentPageGroup > 1 && (
                                    <Button onClick={handlePreviousGroup}>Previous</Button>
                                )}
                                {Array.from({ length: visiblePages }, (_, index) => {
                                    const pageNumber = firstVisiblePage + index;
                                    if (pageNumber <= lastVisiblePage) {
                                        return (
                                            <button
                                                className={styles['pagination-btn']}
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    }
                                    return null;
                                })}
                                {currentPageGroup < maxPageGroups && (
                                    <Button onClick={handleNextGroup}>Next</Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BookListApp;
