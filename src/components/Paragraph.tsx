import React, { FC } from "react";

type ParagraphProps = {
  content: string;
};

const Paragraph: FC<ParagraphProps> = ({ content }) => {
  return (
    <section className="mt-2 py-4 flex flex-wrap w-full px-4 mb-4 text-lg leading-relaxed text-gray">
        {content}
    </section>
  );
}

export default Paragraph;
