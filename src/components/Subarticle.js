import React from "react";

export default function Subarticle(props) {
    function formatChildren(children) {
        var m = []
        
        if (children !== undefined) {
            children.forEach(element => {
                m.push(formatChild(element))
            })
        }
        else {return null}
        
        return m;
    }

    function formatChild(child) {
        if (typeof(child) === "string") {
            return(
                <div className="w-full lg:w-9/12 px-4 my-4 text-md leading-relaxed text-gray">
                    {child}
                </div>
            )
        }
        else {
            return (child)
        }
    }



  return (
    <>
        <section className="mt-2 py-4 border-t border-gray">
            <div className="pl-10 pb-8 mb-2">
                <div className="text-gray text-2xl text-red ">
                    {props.subtitle}
                </div>
            </div>

            <div className="flex flex-wrap">
                {formatChildren(props.children)}
            </div>

        </section>
    </>
  );
}