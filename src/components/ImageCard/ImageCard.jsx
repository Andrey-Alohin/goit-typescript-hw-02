import css from "./ImageCard.module.css";

const settingsImg = {
  format: "&fm=webp",
  scrcSet: {
    img1x: "&dpr=1",
    img2x: "&dpr=2",
  },
};

function ImageCard({ img, clickImg }) {
  return (
    <div className={css.containerImg} onClick={() => clickImg(img)}>
      <img
        className={css.image}
        src={img.urls.small + settingsImg.format}
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
