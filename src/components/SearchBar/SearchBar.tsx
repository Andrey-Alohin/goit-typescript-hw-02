import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEvent } from "react";

type Props = {
  onSubmit: (newQuery: string) => void;
};

function SearchBar({ onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const searchText = formData.get("search");
    if (searchText === "") {
      toast.error("Type any word", { duration: 1000 });
    }
    onSubmit(searchText as string);
    form.reset();
    return;
  };
  return (
    <header className={css.header}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          name="search"
          autoFocus
          autoComplete="off"
          placeholder="Search images and photos"
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
        <Toaster />
      </form>
    </header>
  );
}

export default SearchBar;
