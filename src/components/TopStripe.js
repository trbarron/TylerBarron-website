import React from "react";

export default function TopStripe() {
  return (
    <>
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
    </>
  );
}
