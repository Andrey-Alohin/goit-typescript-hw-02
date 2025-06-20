import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";
function Loader() {
  return (
    <div className={css.loaderContainer}>
      <ClipLoader color="#0064f9" loading size={35} speedMultiplier={0.75} />
    </div>
  );
}

export default Loader;
