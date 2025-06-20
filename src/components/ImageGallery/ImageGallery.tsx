import { Image } from "../../types/image";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

type Props = {
  images: Image[];
  clickImg: (imgInfo: Image) => void;
};

function ImageGallery({ images, clickImg }: Props) {
  return (
    <ul className={css.galery}>
      {images.map((item) => {
        return (
          <li className={css.item} key={item.id}>
            <ImageCard img={item} clickImg={clickImg} />
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery;
