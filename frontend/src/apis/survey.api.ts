import axios from "axios";
import { SurveyType } from "../types";
import baseUrl from "./baseUrl";

export const createSurvey = async (survey:SurveyType) => {
    console.log(survey)
    const {data} = await axios.post(`${baseUrl}/surveys/create`, {...survey})
    return data;
}

// export const getSurvey = async () => {
//     const {data} = await axios.get(`${baseUrl}/surveys/profile`)
//     return data;
// }