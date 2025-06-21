import { FadeLoader } from "react-spinners";
import css from "./LoaderImg.module.css";
type Props = {
  isLoaded: Boolean;
};
function LoaderImg({ isLoaded }: Props) {
  return (
    <div className={`${css.show}  ${isLoaded && css.hide}`}>
      <FadeLoader
        className={css.imgLoader}
        height={15}
        width={5}
        color="#fafafa"
      />
    </div>
  );
}

export default LoaderImg;
