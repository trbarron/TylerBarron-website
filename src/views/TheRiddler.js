import React from "react";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

export default function TheRiddler() {
  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block" style={{ height: "25rem" }}>
          <div className="absolute top-0 w-auto h-full bg-center bg-cover overflow-hidden"></div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-auto absolute pointer-events-none overflow-hidden"
            style={{ height: "14rem", transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 100 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-red fill-current"
                points="3000 0 3000 500 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative pt-4 pb-4 bg-red">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-gray-light w-full shadow-xl rounded-lg -mt-96 lg:w-8/12 xl:w-6/12 lg:mx-auto">
              <div className="px-6">                
                <div className="text-center mt-8">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-dark ">
                    {/* Title */}
                    FiveThirtyEight's The Riddler
                  </h3>
                  <div className="text-gray">
                    <i className="fas fa-briefcase text-lg text-gray-dark"></i>
                    {/* subtitle */}
                    What is the Riddler?
                  </div>
                </div>
                <div className="mt-4 py-10 border-t border-gray">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray">
                        The riddler is a weekly math, logic and probability problem hosted by fivethirtyeight.com, a statistically oriented politics, sports and culture blog.
                      </p>
                      <p>
                        If the answer is particularly cool or my solution can be extended, made interactable or generalized then I'll usually write it up. I've also created and submitted some problems that have been featured.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <main className="profile-page">
      
      {/* top stripe */}
      <section className="relative block" style={{ height: "25rem" }}>
          <div className="absolute top-0 w-auto h-full bg-center bg-cover overflow-hidden"></div>
          <div className="bottom-0 left-0 right-0 w-auto absolute pointer-events-none overflow-hidden inset-y-0"
            style={{ height: "14rem"}}>
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 100 100"
              x="0"
              y="0"
            >
            <polygon
                className="text-red fill-current"
                points="0 0 120 80 0 90 0 0"
            ></polygon>
            </svg>
          </div>
        </section>

        {/* bottom stripe  */}
        <section className="relative block" style={{ height: "25rem" }}>
          <div className="absolute top-0 w-auto h-full bg-center bg-cover overflow-hidden"></div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-auto absolute pointer-events-none overflow-hidden"
            style={{ height: "14rem", transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 100 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-red fill-current"
                points="3000 0 3000 500 0 100"
              ></polygon>
            </svg>
          </div>
        </section>

        
        <section className="relative pt-4 pb-4 bg-red">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-gray-light w-full shadow-xl rounded-lg -mt-xl lg:w-8/12 xl:w-6/12 lg:mx-auto">
              <div className="px-6">                
                <div className="text-center mt-8">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-dark ">
                    {/* Title */}
                    Submitted Problems
                  </h3>
                  <div className="text-gray">
                    <i className="fas fa-briefcase text-lg text-gray-dark"></i>
                    {/* subtitle */}
                    A Pizza Sauce Problem
                  </div>
                </div>
                <div className="mt-4 py-10 border-t border-gray">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray">
                        This problem is about filling a pizza evenly with sauce
                      </p>
                      <p>
                        This problem was unique in that I not only created the problem but also wrote the solution and provided all the diagrams.
                      </p>
                      <p>
                        The solution can be found here
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subarticle */}
                <section className="mt-4 py-10 border-t border-gray">

                    <div className="text-center mb-8">
                        <div className="text-gray">
                            <h2 className="text-2xl text-gray-dark ">
                                {/* subtitle */}
                                Barron Squares
                            </h2>
                            
                            
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray">
                            This is a mathmatical object I made and named
                        </p>
                        <p>
                            It is a square matrix such that each row's leftmost element times its rightmost element will equal the two inner numbers (in the example below, the top row has 6*7 = 42). Similarly, each column's uppermost element times the column's lowermost element equals the middle digits (in the example, the right column is 7*8 = 56), as read top to bottom.
                        </p>
                        <p>
                            This was then expanded on to be a 8x8 with two digit rows/columns being multiplied to get four digit products
                        </p>

                        <p>
                            We ended up finding all 1444 4x4 Barrons Squares, several hundred 8x8 and even a few 16x16 Barron Squares. This was featured as a Riddler Express for FiveThirtyEight.
                        </p>

                        </div>
                    </div>
                </section>


              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
