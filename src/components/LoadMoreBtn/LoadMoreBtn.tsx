import css from "./LoadMoreBtn.module.css";

type Props = {
  loadMore: () => void;
};
function LoadMoreBtn({ loadMore }: Props) {
  return (
    <>
      <button className={css.loadBtn} type="button" onClick={() => loadMore()}>
        Load more
      </button>
    </>
  );
}

export default LoadMoreBtn;
