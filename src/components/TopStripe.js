import React from "react";

export default function TopStripe() {
  return (
    <>
      <section className="relative block h-96">
          <div className="w-auto pointer-events-none overflow-hidden inset-y-0">
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 200 200"
              x="0"
              y="0"
            >
            <polygon
                className="text-red-clear fill-current"
                // points="0 0 3000 120 0 20 0 0"
                points="0,0 300,0 300,30"

            ></polygon>
            </svg>
          </div>
        </section>
    </>
  );
}
