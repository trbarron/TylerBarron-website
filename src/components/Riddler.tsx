import React, { ReactNode } from "react";

type RiddlerProps = {
    children: ReactNode;
};

function formatChildren(children: ReactNode): ReactNode {
    let m: ReactNode[] = [];
    
    if (children !== undefined) {
        if (typeof children === "object" && Array.isArray(children)) {
            children.forEach(element => {
                m.push(formatChild(element));
            });
        } else {
            m.push(formatChild(children));
        }
    } else {
        return null;
    }
    
    return m;
}

function formatChild(child: ReactNode): ReactNode {
    if (typeof child === "string") {
        return (
            <div className="w-full px-4 my-4 text-md leading-relaxed text-gray-light">
                {child}
            </div>
        );
    } else {
        return child;
    }
}

const Riddler: React.FC<RiddlerProps> = ({ children }) => {
    return (
        <section className="flex flex-wrap justify-center w-full bg-gray mx-auto rounded shadow-md lg:w-3/4">
            {formatChildren(children)}
        </section>
    );
}

export default Riddler;