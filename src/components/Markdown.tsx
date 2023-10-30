import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

// Assuming a simplified structure; you need to replace this.
interface ImageMappings {
  [key: string]: string;
}

interface MarkdownProps {
  markdownFile: string;
  imageMappings: ImageMappings;
}

interface ImageProps {
  alt?: string;
  src?: string;
  title?: string;
}

const LinkComponent: React.FC<{ href: string, title?: string, children: ReactNode }> = ({ href, title, children }) => {
  const youtubeRegex = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const match = href.match(youtubeRegex);

  if (match) {
    const videoId = match[1];
    return (
      <div className="flex justify-center">

        <iframe
          title={`YouTube Video ${videoId}`}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    );
  } else {
    return <a href={href}>{children}</a>;
  }
};

const ImgComponent: React.FC<ImageProps> = ({ alt, src, title }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const widthClass = "w-1/2";
  const heightClass = "h-1/3";

  const commonClass = "object-cover object-center";
  const imgClass = isFullscreen
    ? `fixed top-0 left-0 w-screen h-screen z-50 ${commonClass}`
    : `mx-auto ${widthClass} ${heightClass} ${commonClass}`;

  return (
    <img
      alt={alt}
      src={src}
      title={title}
      onClick={toggleFullscreen}
      className={imgClass}
    />
  );
};

const components = {
  img: ImgComponent,
  a: LinkComponent,
};

const Markdown: React.FC<MarkdownProps> = ({ markdownFile }) => {
  return (
    <>
      <section className={"relative container mx-auto px-4 my-12"}>
        <div className={"relative flex flex-col min-w-0 break-words bg-white w-full shadow rounded lg:w-8/12 lg:mx-auto px-6"}>
          <div className="mt-4">
            <ReactMarkdown
              children={markdownFile}
              components={components as any}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Markdown;
