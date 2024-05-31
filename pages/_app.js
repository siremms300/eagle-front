
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import 'antd';
import '../public/css/styles.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import { Provider } from '../context';

function MyApp({Component, pageProps}) {

    return(
        <Provider>
            <ToastContainer />
            <Navbar/>
            <Component {...pageProps}/>
            <Footer/>
        </Provider>
    )
}

export default MyApp