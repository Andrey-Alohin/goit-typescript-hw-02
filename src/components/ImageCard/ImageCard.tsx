import { useState } from "react";
import { Image } from "../../types/image";
import css from "./ImageCard.module.css";
import PlaceHolderModal from "../PlaceHolderModal/PlaceHolderModal";

const settingsImg = {
  format: "&fm=webp",
  scrcSet: {
    img1x: "&dpr=1",
    img2x: "&dpr=2",
  },
};

type Props = {
  img: Image;
  clickImg: (imgInfo: Image) => void;
};

function ImageCard({ img, clickImg }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className={css.containerImg} onClick={() => clickImg(img)}>
      <img
        className={`${css.image} ${!isLoading && css.loaded}`}
        src={img.urls.small + settingsImg.format}
        onLoad={() => setIsLoading(false)}
        srcSet={`${
          img.urls.small + settingsImg.scrcSet.img1x + settingsImg.format
        } 1x,
                ${
                  img.urls.small +
                  settingsImg.scrcSet.img2x +
                  settingsImg.format
                } 2x
        `}
        alt={img.alt_description}
      />
    </div>
  );
}

export default ImageCard;
