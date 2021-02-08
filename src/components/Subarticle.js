import React from "react";

export default function Subarticle({subtitle,content}) {
  return (
    <>
        <section className="mt-2 py-4 border-t border-gray">
            <div className="pl-10 pb-8 mb-2">
                <div className="text-gray text-2xl text-gray-dark ">
                    {subtitle}
                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4 mb-4 text-lg leading-relaxed text-gray">
                    {content}
                </div>
            </div>

        </section>
    </>
  );
}