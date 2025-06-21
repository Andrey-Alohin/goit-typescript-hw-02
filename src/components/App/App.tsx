import { lazy, Suspense, useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
const ImageGallery = lazy(() => import("../ImageGallery/ImageGallery"));
const LoadMoreBtn = lazy(() => import("../LoadMoreBtn/LoadMoreBtn"));
const ErrorMessage = lazy(() => import("../ErrorMessage/ErrorMessage"));
const Loader = lazy(() => import("../Loader/Loader"));
const ImageModal = lazy(() => import("../ImageModal/ImageModal"));
import toast from "react-hot-toast";
import { fetchImages } from "../../unsplash-api";
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
  const [modalInfo, setModalInfo] = useState<null | ModalImage>(null);

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
    setModalInfo(null);
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
        {hasImages && !isLoading && !isLastPage && (
          <LoadMoreBtn loadMore={loadMore} />
        )}
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
      </Suspense>
      <Suspense fallback={null}>
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
