import React, { useState, useRef } from "react";
import { BasicQuestionType } from "../types";

type AccordionProps = {
  question: any;
  answers: any;
};
const Accordion = ({ question, answers }: AccordionProps) => {
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
          <h4 className="font-semibold">{question.title}</h4>
          {isOpened ? "△" : "▽"}
        </div>
        <div
          ref={contentElement}
          style={{ height: height }}
          className="bg-gray-100 overflow-hidden transition-all duration-700"
        >
          {answers.map((answer: any) => (
            <p className="p-4">{answer.answer}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
