
import React, { useState } from "react";
import Modal from 'react-modal';

export default function Photo(props) {

    const [photoOpen,setPhotoOpen] = useState(false);
  
    let caption = {}

    if (props.caption === undefined) {
        caption.text = "";
        caption.className = ""
    }
    else {
        caption.text = props.caption;
        caption.className = "text-center text-gray-light text-sm pt-1"
    }

    function onPhotoClick() {
        setPhotoOpen(true);
    }

    function handleRequestCloseFunc() {
        setPhotoOpen(false);
    }

    return (



    <>
        <Modal
            isOpen={photoOpen}
            onRequestClose={handleRequestCloseFunc}
            preventScroll={true}
            shouldFocusAfterRender={false}
            className={"inset-y-0 inset-x-0 flex fixed h-full w-full m-auto justify-center lg:w-3/4 lg:h-3/4"}
        >
            <button className={"h-screen w-screen bg-opacity-100 absolute z-10"} onClick={handleRequestCloseFunc}></button>
            <img src={props.src} alt={props.alt} class="rounded object-contain" onClick={handleRequestCloseFunc}/>
        
        </Modal>

        <section className="flex flex-wrap justify-center mx-auto w-full">
            <div className="p-2 bg-gray max-w-3/4 m-auto rounded shadow-md lg:w-1/2" onClick={onPhotoClick}>
                <img src={props.src} alt={props.alt} class="w-auto hmax-16 rounded m-auto"/>
                <div className={caption.className}>
                    {caption.text}
                </div>
            </div>
        </section>
    </>
  );
}