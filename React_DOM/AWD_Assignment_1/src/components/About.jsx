import React from "react";

function About({ isDarkMode }) {

    return (
        <>
            <div>
                <p className={`items-center text-justify ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Hi, I'm Areef ur Rahman, a web developer with a strong foundation in both design and development. I build modern, high-performing websites using technologies such as React, Node.js, Express, and MongoDB, WordPress, and Shopify, focusing on front-end and back-end.

                 Before moving deeper into development, I worked as a graphic designer and completed 200+ projects with 100+ positive reviews on Fiverr. I bring strong experience in delivering quality work and meeting deadlines. My background in graphic design helps me create websites that are not only functional but also visually engaging.</p>
            </div>
        </>
    )

}


export default About;