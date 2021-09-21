import React from "react";

export default function Article(props) {

const modifiedClassName = "relative flex flex-col min-w-0 break-words bg-gray-light w-full shadow-md rounded-lg lg:w-8/12 lg:mx-auto px-6 " + props.styleModifier;

return (
    <>
        <section className={"relative container mx-auto px-4 my-12"}>
            <div className={modifiedClassName}>
                <div className="mt-4">
                    <h3 className="text-3xl lg:text-4xl leading-normal text-gray-dark ">
                        {props.title}
                    </h3>
                    <h2 className="text-xl lg:text-2xl text-red-clear pb-2">
                        {props.subtitle}
                    </h2>
                </div>
                {props.children}
            </div>
        </section>
    </>
  );
}