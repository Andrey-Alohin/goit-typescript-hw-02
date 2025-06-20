import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

function ImageGallery({ images, clickImg }) {
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
