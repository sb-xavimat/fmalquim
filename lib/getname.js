import { getCardData } from "./carddata.js";

// Return only the name of the substance in the required system.
function getName(props) {
    props.mode = "FN";
    const data = getCardData(props);

    const lastLine = data.lines.at(-1);
    const leftPart = lastLine.left;
    const joined = leftPart.map(part => part.text).join("");

    return joined;
}

export { getName };