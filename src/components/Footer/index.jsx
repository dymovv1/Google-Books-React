import styles from './footer.module.scss';

function Footer() {
    return(
        <>
            <footer className={styles['footer']}>
                <div className='container'>
                    <div className={styles['footer-body']}>

                        <div className={styles['footer-links']}>

                            <a href="https://github.com/dymovv1">GitHub</a>
                            <a href="https://www.linkedin.com/in/dziuba1/">Linkedin</a>

                        </div>

                    </div>
                </div>
            </footer>
        </>
    )

}

export default Footer;