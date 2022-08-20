import React, { useState, useRef, useEffect } from "react";
import { IQuestionData } from "../types";
import { getResultElementByType } from "../helpers/question.helper";

type AccordionProps = {
  question: IQuestionData;
  answers: any;
};

export const Accordion = ({ question, answers }: AccordionProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("0px");
  const contentElement = useRef<HTMLDivElement>(null);

  const handleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement.current?.scrollHeight}px` : "0px");
  };

  return (
    <div className="p-1">
      <div onClick={handleOpening}>
        <div
          className={
            "bg-themeColor rounded-r-lg p-4 flex justify-between text-white"
          }
        >
          <h4 className="font-semibold">{question.title}</h4>
          {isOpened ? "△" : "▽"}
        </div>
        <div
          ref={contentElement}
          style={{ height: height }}
          className="bg-gray-100 overflow-hidden transition-all duration-300"
        >
          {answers && getResultElementByType(question, answers)}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
