import styles from './header.module.scss'
import logo from '../../assets/img/header_logo.png'
import { Link } from 'react-router-dom';





function Header({ path }) {
    const handleHomeClick = () => {
        console.log('Clicked on Home');
    };

    return(
        <>
            <header className={styles['header']}>


                <div className='container'>
                    <div className={styles['header-body']}>
                        <div>
                            <a href='/'>
                                <img className={styles['header-logo']} src={logo} alt={logo}/>
                            </a>

                        </div>

                        <div className={styles['header-title__block']}>
                            <p className={styles['header-title']}>Library for you</p>
                        </div>

                        <div className="breadcrumbs">
                            <Link to="/" onClick={handleHomeClick}>
                                Home
                            </Link>
                            {' > '}
                            {path.includes('/book/') && <span>Book</span>}
                        </div>


                    </div>

                </div>

            </header>
        </>
    )

}

export default Header;