import React from "react";

export default function Article(props) {
 
return (
    <>
        <section className="relative container mx-auto px-4 my-12">
            <div className={"relative flex flex-col min-w-0 break-words bg-gray-light w-full shadow-md rounded-lg lg:w-8/12 xl:w-6/12 lg:mx-auto"}>
                <div className="px-6">                
                    <div className="mt-8">
                        <h3 className="text-4xl font-semibold leading-normal text-gray-dark ">
                            {props.title}
                        </h3>
                        <h2 className="text-2xl text-red-clear pb-2">
                            {props.subtitle}
                        </h2>
                    </div>
                    {props.children}
                </div>
            </div>
        </section>
    </>
  );
}