import React  from "react";
import Footer from "./Footer.js"
import Header from "./Header.js"
import {Helmet} from "react-helmet"
import  { Toaster } from 'react-hot-toast';

const Layout =({children , title , description , keywords , author}) =>{
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <div>
                    <meta name ="description" content={description}/>
                    <meta name ="keywords" content={keywords}/>
                    <meta name ="author" content={author}/>
                </div>
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{minHeight:"70vh"}}>  
                <Toaster/>
                {children}
                </main>
            <Footer />
        </div>
    )
}
Layout.defaultProps ={
    title : "DreamHouse",
    description : "mern stack",
    keywords : "mern,react,node, mongodb ",
    author : "chandra"
}
export default Layout