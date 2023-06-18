import styles from './bookDetails.module.scss'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PageBookDetails() {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
            const data = await response.json();
            setBookDetails(data);
        };

        fetchBookDetails();
    }, [id]);

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    const { volumeInfo, saleInfo, accessInfo } = bookDetails;

    return (
        <>
            <div className={styles['page-book']}>
                <div className='container'>
                <div className={styles['page-book__body']}>

                    <div className={styles['page-book__general']}>
            {volumeInfo.imageLinks && (
                <img className={styles['page-book__img']}  src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} />
            )}
            <h2 className={styles['page-book__title']}> <span className={styles['page-book__name']}>Name :</span> {volumeInfo.title}</h2>
                    <p> <span className={styles['page-book__name']}>Author :</span> {volumeInfo.authors}</p>
                    </div>

                    <div className={styles['page-book__info']}>
                    <p className={styles['page-book__description']}><span className={styles['page-book__name']}>Description :</span> {volumeInfo.description}</p>
                        <p> <span className={styles['page-book__name']}> Release Date : </span> {volumeInfo.publishedDate}</p>
            <p> <span className={styles['page-book__name']}> Publisher : </span> {volumeInfo.publisher}</p>
            <p> <span className={styles['page-book__name']}> Pages : </span> {volumeInfo.pageCount}</p>
            <p> <span className={styles['page-book__name']}> Type : </span> {volumeInfo.printType}</p>
                    </div>

                    <div className={styles['page-book__buttons']}>
            <a className={styles['page-book__btn']} target='_blank' href={volumeInfo.previewLink}>PREVIEW</a>
            {saleInfo && <a className={styles['page-book__btn']}  target='_blank' href={saleInfo.buyLink}>BUY</a>}
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default PageBookDetails;
