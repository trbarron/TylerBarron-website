
import React from "react";

function formatChildren(children) {
    var m = []
    
    if (children !== undefined) {
        if (typeof(children) === "object") {
            children.forEach(element => {
                m.push(formatChild(element))
            })
        }
        else {
            m.push(formatChild(children));
        }
    }

    else {return null}
    
    return m;
}

function formatChild(child) {
    if (typeof(child) === "string") {
        return(
            <div className="w-full px-4 my-4 text-md leading-relaxed text-gray-light">
                {child}
            </div>
        )
    }
    else {
        return (child)
    }
}


export default function Riddler(props) {
  
    return (
    <>
        <section className="flex flex-wrap justify-center w-full bg-gray mx-auto rounded shadow-md lg:w-3/4">
            {formatChildren(props.children)}
        </section>
    </>
  );
}