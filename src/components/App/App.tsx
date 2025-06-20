import { lazy, Suspense, useEffect, useState } from "react";
// import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
const ImageGallery = lazy(() => import("../ImageGallery/ImageGallery"));
// import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
const LoadMoreBtn = lazy(() => import("../LoadMoreBtn/LoadMoreBtn"));
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
const ErrorMessage = lazy(() => import("../ErrorMessage/ErrorMessage"));
import { fetchImages } from "../../unsplash-api";
import Loader from "../Loader/Loader";
// import ImageModal from "../ImageModal/ImageModal";
const ImageModal = lazy(() => import("../ImageModal/ImageModal"));
import toast from "react-hot-toast";
import { Image } from "../../types/image";
import { ModalImage } from "../../types/modalObj";
function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setError] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalImage>({
    likes: 0,
    description: "",
    alt: "",
    imgUrl: "",
    sourceLink: "",
    user: {
      name: "",
      profImg: "",
      link: "",
    },
  });

  const searchImg = (newQuery: string): void => {
    if (newQuery.toLowerCase() === userQuery.toLowerCase()) {
      toast.error("You allready search this query", { duration: 1000 });
      return;
    }
    setUserQuery(newQuery);
    setImages([]);
    setCurrentPage(1);
  };

  const loadMore = () => setCurrentPage(currentPage + 1);

  const openModal = (imgInfo: Image): void => {
    setModalInfo({
      likes: imgInfo.likes,
      description: imgInfo.description,
      alt: imgInfo.alt_description,
      imgUrl: imgInfo.urls.regular,
      sourceLink: imgInfo.links.html,
      user: {
        name: imgInfo.user.name,
        profImg: imgInfo.user.profile_image.small,
        link: imgInfo.user.links.html,
      },
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalInfo({
      likes: 0,
      description: "",
      alt: "",
      imgUrl: "",
      sourceLink: "",
      user: {
        name: "",
        profImg: "",
        link: "",
      },
    });
  };
  useEffect(() => {
    if (userQuery === "") {
      return;
    }

    async function fetchData() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImages(userQuery, currentPage);
        setImages((prevImg) => [...prevImg, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userQuery, currentPage]);

  const hasImages = images.length > 0;
  const isLastPage = totalPages === currentPage;
  return (
    <>
      <SearchBar onSubmit={searchImg} />
      <Suspense fallback={null}>
        {hasImages && <ImageGallery images={images} clickImg={openModal} />}
        {isLoading && <Loader />}
        {hasImages && !isLoading && !isLastPage && (
          <LoadMoreBtn loadMore={loadMore} />
        )}
        {isError && <ErrorMessage />}
        <ImageModal
          isModalOpen={isModalOpen}
          modalInfo={modalInfo}
          closeModal={closeModal}
        />
      </Suspense>
    </>
  );
}

export default App;
