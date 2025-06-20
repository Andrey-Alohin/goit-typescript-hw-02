import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

function SearchBar({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchText = e.target.elements.search.value.trim();
    if (searchText === "") {
      toast.error("Type any word", { duration: 1000 });
    }
    onSubmit(searchText);
    e.target.reset();
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
