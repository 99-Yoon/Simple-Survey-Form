import React, { useState, useRef } from "react";

type AccordionProps = {
  title: string;
  content: string;
};
const Accordion = ({ title, content }: AccordionProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("0px");
  const contentElement = useRef<HTMLDivElement>(null);

  const HandleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement.current?.scrollHeight}px` : "0px");
  };
  return (
    <div className="p-1">
      <div onClick={HandleOpening}>
        <div className={"bg-themeColor p-4 flex justify-between text-white"}>
          <h4 className="font-semibold">{title}</h4>
          {isOpened ? "△" : "▽"}
        </div>
        <div
          ref={contentElement}
          style={{ height: height }}
          className="bg-gray-100 overflow-hidden transition-all duration-700"
        >
          <p className="p-4">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
