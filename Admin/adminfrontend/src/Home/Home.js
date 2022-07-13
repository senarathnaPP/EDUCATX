import React from 'react';
import '../App.css'
import AdminNavbar from '../components/AdminNavbar/adminNavbar';
import Cards from '../components/Cards/Cards';
import Footer from '../components/Footer/Footer';

function Home(){
    return(
        <>  
        {/* style={{background: teal}} */}
            <AdminNavbar />
            <Cards />
            <Footer/>

        </>

    );
}
 
export default Home;