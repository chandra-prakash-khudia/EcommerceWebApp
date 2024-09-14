import React from "react"
import Layout from './../components/Layout.js';

const About =()=>{
    return(
        <Layout title={"About us Ecommerce app"}>
            <div className="row contactus">
                <div className="col-md-6">
                   <img 
                   src="/images/about.jpeg"
                   alt= "Contact us "
                   style ={{width:"100%"}}
                   />
                </div>
                <div className="col-md-4">
                    <p className="text-justify mt-2 ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quod.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quod.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quod.
                        
                    </p>
                </div>
            </div>
        </Layout>
    );
};
export default About;