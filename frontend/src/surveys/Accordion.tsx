import React, { useState, useRef, useEffect } from "react";
import { IQuestionData } from "../types";
// import {
//   REssay,
//   RCheckbox,
//   RRadio,
//   RDropdown,
//   RFile,
//   RRating,
//   RDate,
// } from "../forms";
import { getResultElementByType } from "../helpers/question.helper";

type AccordionProps = {
  question: IQuestionData;
};

export const Accordion = ({ question }: AccordionProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("0px");
  const contentElement = useRef<HTMLDivElement>(null);

  const HandleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement.current?.scrollHeight}px` : "0px");
  };
  // function getContent(question: IQuestionData) {
  //   switch (question.type) {
  //     case "singletext":
  //       return <REssay question={question} />;
  //     case "radio":
  //       return <RRadio question={question} />;
  //     case "checkbox":
  //       return <RCheckbox question={question} />;
  //     case "dropdown":
  //       return <RDropdown question={question} />;
  //     case "file":
  //       return <RFile question={question} />;
  //     case "rating":
  //       return <RRating question={question} />;
  //     case "date":
  //       return <RDate question={question} />;
  //     default:
  //       return <></>;
  //   }
  // }

  // console.log(question);

  return (
    <div className="p-1">
      <div onClick={HandleOpening}>
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
          {question.answers && getResultElementByType(question)}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
