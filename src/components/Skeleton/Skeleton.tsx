import { ReactElement } from "react";
import css from "./Skeleton.module.css";

interface Props {
  children: ReactElement;
  isLoading: boolean;
}
function Skeleton({ children, isLoading }: Props) {
  return (
    <div className={`${css.skeleton} ${isLoading && css.loading}`}>
      {children}
    </div>
  );
}

export default Skeleton;
