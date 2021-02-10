
import React, { useState } from "react";

export default function Video(props) {

  
    let caption = {}

    if (props.caption === undefined) {
        caption.text = "";
        caption.className = ""
    }
    else {
        caption.text = props.caption;
        caption.className = "text-center text-gray-light text-sm pt-1"
    }

    return (



    <>
        <section className="flex flex-wrap justify-center mx-auto w-full">
            <div className="p-2 bg-gray w-3/4 rounded shadow-md lg:w-1/2">
                <iframe src={props.src} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen className="h-auto rounded max-w-full"></iframe>
                <div className={caption.className}>
                    {caption.text}
                </div>
            </div>
        </section>
    </>
  );
}