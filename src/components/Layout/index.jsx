import { Outlet, useLocation } from 'react-router-dom';
import Header from "../Header/index.jsx";
import Footer from "../Footer/index.jsx";

function Layout() {
    const location = useLocation();

    return (
        <>
            <Header path={location.pathname} />
            <main className=''>
                <div>
                    <Outlet />
                </div>
            </main>
            <Footer/>

        </>
    );
}

export default Layout;
