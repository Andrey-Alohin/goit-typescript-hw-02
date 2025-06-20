import { FcLike } from "react-icons/fc";
import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { ModalImage } from "../../types/modalObj";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import PlaceHolderModal from "../PlaceHolderModal/PlaceHolderModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    background: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
  },
};

type Props = {
  isModalOpen: boolean;
  modalInfo: ModalImage;
  closeModal: () => void;
};

function ImageModal({ isModalOpen, modalInfo, closeModal }: Props) {
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
          src={`${imgUrl}&fm=webp`}
          alt={alt}
          srcSet={`${imgUrl}&dpr=1&fm=webp 1x, ${imgUrl}&dpr=2&fm=webp 2x`}
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
              src={`${user.profImg}&fm=webp`}
              srcSet={`${user.profImg}&dpr=1&fm=webp 1x,
                ${user.profImg}&dpr=2&fm=webp 2x`}
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
