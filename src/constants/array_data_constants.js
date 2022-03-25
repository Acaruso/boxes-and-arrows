import { textConstants } from "./text_constants";

// difference between padding and margin:
// padding is space between elements, but still inside border
// margin is space outside border

let arrayDataConstants_ = {
    refRect: { x: 0, y: 0, w: 26, h: 26 },
    topLabelYPadding: 4,
    bottomLabelYPadding: 4,
    indexLabelTopYPadding: 4,
    indexLabelBottomYPadding: 2,
    bottomPadding: 4,
    sidePadding: 8,
    topMargin: 4,
    pointRadius: 3,
    indexLabelArrowLength: 9,
};

arrayDataConstants_.totalHeightWithIndexLabels = (
    textConstants.charHeight
    + arrayDataConstants_.indexLabelTopYPadding
    + arrayDataConstants_.indexLabelArrowLength
    + arrayDataConstants_.indexLabelBottomYPadding
    + textConstants.charHeight
    + arrayDataConstants_.topLabelYPadding
    + arrayDataConstants_.refRect.h
    + arrayDataConstants_.bottomLabelYPadding
    + textConstants.charHeight
    + arrayDataConstants_.bottomPadding
);

arrayDataConstants_.totalHeightWithoutIndexLabels = (
    textConstants.charHeight
    + arrayDataConstants_.topLabelYPadding
    + arrayDataConstants_.refRect.h
    + arrayDataConstants_.bottomLabelYPadding
    + textConstants.charHeight
    + arrayDataConstants_.bottomPadding
);

const arrayDataConstants = { ...arrayDataConstants_ };

export { arrayDataConstants };
