import {apiBaseURL} from "../config";

export const convertImage = (image: string) => {
    return `${apiBaseURL}/images/${image}`
}
