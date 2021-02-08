import React from "react";

export default function Paragraph({content}) {
  return (
    <>
        <section className="mt-2 py-4 flex flex-wrap w-full px-4 mb-4 text-lg leading-relaxed text-gray">
            {content}
        </section>
    </>
  );
}