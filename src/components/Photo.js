
import React from "react";

export default function Photo(props) {
  
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
        <section className="flex flex-wrap justify-center mx-auto">
            <div className="p-2 bg-gray w-1/2 rounded shadow-md">
                <img src={props.src} alt={props.alt} class="h-auto hmax-16 rounded"/>
                <div className={caption.className}>
                    {caption.text}
                </div>
            </div>
        </section>
    </>
  );
}