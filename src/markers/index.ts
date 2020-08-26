import { File } from "../api";

import image01 from "./images/marker01.png";
import image02 from "./images/marker02.png";
import image03 from "./images/marker03.png";
import image04 from "./images/marker04.png";
import image05 from "./images/marker05.png";
import image06 from "./images/marker06.png";
import image07 from "./images/marker07.png";
import image08 from "./images/marker08.png";
import image09 from "./images/marker09.png";
import image10 from "./images/marker10.png";
import pattern01 from "./patterns/marker01.patt";
import pattern02 from "./patterns/marker02.patt";
import pattern03 from "./patterns/marker03.patt";
import pattern04 from "./patterns/marker04.patt";
import pattern05 from "./patterns/marker05.patt";
import pattern06 from "./patterns/marker06.patt";
import pattern07 from "./patterns/marker07.patt";
import pattern08 from "./patterns/marker08.patt";
import pattern09 from "./patterns/marker09.patt";
import pattern10 from "./patterns/marker10.patt";

type MarkerData = {
  id: string;
  imageSrc: string;
  patternSrc: string;
};

const markerList: Array<MarkerData> = [
  {
    id: "marker01",
    imageSrc: image01,
    patternSrc: pattern01,
  },
  {
    id: "marker02",
    imageSrc: image02,
    patternSrc: pattern02,
  },
  {
    id: "marker03",
    imageSrc: image03,
    patternSrc: pattern03,
  },
  {
    id: "marker04",
    imageSrc: image04,
    patternSrc: pattern04,
  },
  {
    id: "marker05",
    imageSrc: image05,
    patternSrc: pattern05,
  },
  {
    id: "marker06",
    imageSrc: image06,
    patternSrc: pattern06,
  },
  {
    id: "marker07",
    imageSrc: image07,
    patternSrc: pattern07,
  },
  {
    id: "marker08",
    imageSrc: image08,
    patternSrc: pattern08,
  },
  {
    id: "marker09",
    imageSrc: image09,
    patternSrc: pattern09,
  },
  {
    id: "marker10",
    imageSrc: image10,
    patternSrc: pattern10,
  },
];

export const getMarkerImageUrl = (file: File): string | undefined => {
  return markerList.find((markerData) => markerData.id === file.markerID)?.imageSrc;
};

export const getMarkerPatternUrl = (file: File): string | undefined => {
  return markerList.find((markerData) => markerData.id === file.markerID)?.patternSrc;
};

export const getMarker = (file: File): MarkerData | undefined => {
  return markerList.find((markerData) => markerData.id === file.markerID);
};
