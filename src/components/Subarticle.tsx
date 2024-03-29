import React, { ReactNode } from "react";

type SubarticleProps = {
    subtitle: string;
    children?: ReactNode[] | ReactNode;
}

export default function Subarticle(props: SubarticleProps) {

    function formatChildren(children: ReactNode[] | ReactNode): ReactNode[] | null {
        const m: ReactNode[] = [];
        
        if (children !== undefined) {
            if (Array.isArray(children)) {
                children.forEach(element => {
                    m.push(formatChild(element))
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
                <div className="w-full lg:w-11/12 px-4 my-4 text-md mx-auto leading-relaxed text-gray font-body">
                    {child}
                </div>
            );
        } else {
            return child;
        }
    }

    return (
        <>
            <section className="mt-2 py-4 border-t border-gray">
                <div className="pl-2 pb-4">
                    <div className="text-3xl text-red">
                        {props.subtitle}
                    </div>
                </div>

                <div className="">
                    {formatChildren(props.children)}
                </div>
            </section>
        </>
    );
}
