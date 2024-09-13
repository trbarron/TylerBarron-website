import React, { FC } from "react";
import ImageGallery from 'react-image-gallery';

// Import components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Subarticle from "../components/Subarticle";
import Article from "../components/Article";
import Riddler from "../components/Riddler";

// Import assets
import plotter from "../assets/img/GenerativeArt/plotter.jpg";
import pic1 from "../assets/img/GenerativeArt/1.jpg";
import pic2 from "../assets/img/GenerativeArt/2.jpg";
import pic3 from "../assets/img/GenerativeArt/3.jpg";
import pic4 from "../assets/img/GenerativeArt/4.jpg";
import pic5 from "../assets/img/GenerativeArt/5.jpg";

// Import CSS for react-image-gallery
import "react-image-gallery/styles/css/image-gallery.css";

const GenerativeArt: FC = () => {
    const images = [
        {
            original: plotter,
            thumbnail: plotter,
            description: "my HP 7550A pen plotter"
        },
        {
            original: pic1,
            thumbnail: pic1,
        },
        {
            original: pic2,
            thumbnail: pic2,
        },
        {
            original: pic3,
            thumbnail: pic3,
        },
        {
            original: pic4,
            thumbnail: pic4,
        },
        {
            original: pic5,
            thumbnail: pic5,
        }
    ];

    return (
        <div className="bg-background bg-fixed min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Article
                    title="Generative Art"
                    subtitle=""
                >
                    <Subarticle subtitle="goodbad.png">
                        <p>Inspired by <a href="https://medium.com/quarterstudio/an-intro-to-pen-plotters-29b6bd4327ba">a blog post</a> I decided to purchase a 1980's pen plotter and get into the world of generative art</p>
                        
                        <ImageGallery items={images} />

                        <p>After taking some online classes I set up an instagram to showcase my art: <a href="https://www.instagram.com/goodbad.png/">goodbad.png</a>. This led to an invitation to an online community of generative artists to share work and methodology</p>
                        <p>After months of sharing work I was accepted to showcase my art at the local library with an exhibition for the public. This was unfortunately canceled due to COVID-19 but <a href="https://www.instagram.com/p/B_h_3LmAZSy/">led to a digital exhibition on their instagram</a></p>
                        <p>Here is my artist's statement about the generative work:</p>

                        <Riddler>
                            {"good bad plotting is a showcase of generated geometric structures, which I disrupt to create snapshots reminiscent of the natural world. I guide their creation using repetition, symmetry, and reoccurring patterns. My work embraces exploration and discovery, often following unintended paths to get to the result. The code is written by myself primarily in JavaScript, and I then trace it to paper using a modified 1980's Hewlett-Packard pen plotter."}
                        </Riddler>

                    </Subarticle>
                    <Subarticle
                        subtitle="For more:"
                    >
                        <p>
                            Check out more work <a href="https://www.instagram.com/goodbad.png/">on my instagram</a> where I post this work along with some photography.
                        </p>
                    </Subarticle>
                </Article>
            </main>
            <Footer />
        </div>
    );
};

export default GenerativeArt;