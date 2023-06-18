import { Input, Button } from "@material-tailwind/react";
import styles from './search.module.scss';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [resultCount, setResultCount] = useState(16);
    const [totalItems, setTotalItems] = useState(0);

    const API_KEY = 'AIzaSyCLIe5nB1uVG8yM84r6yTXUGVuHq3xuw2g';

    const handleSearch = async () => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=${resultCount}&key=${API_KEY}`);
        const data = await response.json();

        if (data.totalItems === 0) {
            setNotFound(true);
            setSearchResult([]);
        } else {
            setNotFound(false);
            setSearchResult(data.items || []);
            setTotalItems(data.totalItems);
        }

        setShowResult(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleMoreResults = async () => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${searchResult.length}&maxResults=${resultCount}&key=${API_KEY}`);
        const data = await response.json();

        setSearchResult(prevResults => [...prevResults, ...(data.items || [])]);
    };

    const handleClean = () => {
        setSearchQuery("");
        setSearchResult([]);
        setNotFound(false);
        setShowResult(false);
        setResultCount(16);
        setTotalItems(0);
    };

    useEffect(() => {
        if (searchResult.length >= resultCount && searchResult.length < totalItems) {
            setShowResult(true);
        }
    }, [searchResult, resultCount, totalItems]);

    return (
        <>
            <section className={styles['search']}>
                <div className={styles['search-bg']}>
                    <div className='container'>
                        <div className={styles['search-body']}>
                            <div title='Press Enter' className={`w-72 ${styles['search-input']}`}>
                                <Input className={styles['input']} label="BOOK AUTHOR CATEGORIES" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} />
                                <div className={styles['search-buttons']}>
                                    <Button onClick={handleSearch}>Search</Button>
                                    <Button color="red" onClick={handleClean}>Clean</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showResult && (
                <section className={styles['result']}>
                    <div className='container'>
                        <h3 className={styles['result-title']}>Result :</h3>

                        {notFound ? (
                            <h3>Result: NOT FOUND</h3>
                        ) : (
                            <>
                                <div className={styles['result-body']}>
                                    {searchResult.map((item) => {
                                        if (item.volumeInfo?.imageLinks) {
                                            return (
                                                <div  key={item.id}>

                                                    <Link to={`/book/${item.id}`} className={styles['result-card']}>

                                                        <div>
                                                            <img className={styles['result-img']} src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} />
                                                        </div>

                                                        <div className={styles['result-text']}>
                                                            <h4 className={styles['result-name']}>{item.volumeInfo.title}</h4>
                                                            <p className={styles['result-author']}>{item.volumeInfo.authors?.join(", ")}</p>
                                                        </div>
                                                    </Link>

                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                                <div className={styles['result-btn__more']}>
                                    {searchResult.length < totalItems && (
                                        <Button onClick={handleMoreResults}>More</Button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}

export default Search;
