import { FcLike } from "react-icons/fc";
import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { ModalImage } from "../../types/modalObj";
import { useEffect, useState } from "react";
import PlaceHolderModal from "../LoaderImg/LoaderImg";
import { settingsImg } from "../../helper/settingsImg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    borderRadius: "16px",
    background: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
  },
};

type Props = {
  isModalOpen: boolean;
  modalInfo: ModalImage | null;
  closeModal: () => void;
};

function ImageModal({ isModalOpen, modalInfo, closeModal }: Props) {
  if (modalInfo === null) {
    return;
  }
  const [isLoaded, setIsLoaded] = useState(false);
  const { likes, description, alt, imgUrl, sourceLink, user } = modalInfo;
  useEffect(() => setIsLoaded(false), [modalInfo]);
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={`Full image of ${alt}`}
    >
      <div className={css.modalContainer}>
        <PlaceHolderModal isLoaded={isLoaded} />
        <img
          className={`${css.originalImg} ${isLoaded && css.loaded}`}
          onLoad={() => setIsLoaded(true)}
          src={imgUrl + settingsImg.format}
          alt={alt}
          srcSet={`${
            imgUrl + settingsImg.scrcSet.img1x + settingsImg.format
          } 1x, ${imgUrl + settingsImg.scrcSet.img2x} 2x`}
        />
        <div className={css.imageInfo}>
          <a
            className={css.profile}
            href={user.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={css.userImg}
              src={user.profImg + settingsImg.format}
              srcSet={`${
                user.profImg + settingsImg.scrcSet.img1x + settingsImg.format
              } 1x,
                ${
                  user.profImg + settingsImg.scrcSet.img2x + settingsImg.format
                } 2x`}
              alt={`avatar${user.name}`}
            />
            <h3 className={css.userName}>{user.name}</h3>
          </a>
          <p className={css.description}>{description || "No desription"}</p>
          <p className={css.likes}>
            <FcLike />
            {likes}
          </p>
          <a
            className={css.linkOriginal}
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Unsplash
          </a>
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;
