import React, { useState, useRef, useEffect } from "react";
import { IQuestionData } from "../types";
import { REssayForm } from "./REssayForm";
import { RCheckboxForm } from "./RCheckboxForm";
import { RRadioForm } from "./RRadioForm";
import { RDropdownForm } from "./RDropdownForm";
import { RFileForm } from "./RFileForm";
import { RRatingForm } from "./RRatingForm";
import { RDateForm } from "./RDateForm";

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
  function getContent(question: IQuestionData) {
    switch (question.type) {
      case "essay":
        return <REssayForm question={question} />;
      case "radio":
        return <RRadioForm question={question} />;
      case "checkbox":
        return <RCheckboxForm question={question} />;
      case "dropdown":
        return <RDropdownForm question={question} />;
      case "file":
        return <RFileForm question={question} />;
      case "rating":
        return <RRatingForm question={question} />;
      case "date":
        return <RDateForm question={question} />;
      default:
        return <></>;
    }
  }

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
          {question.answers && getContent(question)}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
