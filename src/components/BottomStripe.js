import React from "react";
import bckgrndImg from '../assets/img/background.jpg';

export default function BottomStripe() {
  return (
    <>
        <section className="relative block" style={{ height: "25rem" }}>
          <div className="absolute top-0 w-auto h-full bg-center bg-cover overflow-hidden">
          </div>
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
                className="text-red-clear fill-current"
                points="3000 0 3000 500 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
    </>
  );
}