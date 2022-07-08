import axios from "axios";
import {  } from "../types";
import baseUrl from "./baseUrl";

export const createQuestion = async () => {
    const { data } = await axios.post(`${baseUrl}/questions/create`, {
        type: "essay",
        title: "Question Title",
        isRequired: false,
        comment: "질문에 대한 설명을 입력해주세요",
        content: null,
    });
    return data;
  };
  