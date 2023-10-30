import React from "react";

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
            <section className="justify-center mx-auto w-3/4 h-fit lg:w-1/2">
                <div className="p-2 bg-gray w-full h-full rounded shadow-md">
                    <iframe
                        src={props.src}
                        title={props.src}
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        className="rounded w-full h-60" />
                    <div className={caption.className}>
                        {caption.text}
                    </div>
                </div>
            </section>
        </>
    );
}