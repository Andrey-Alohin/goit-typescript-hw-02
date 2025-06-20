import css from "./ErrorMessage.module.css";

function ErrorMessage() {
  return (
    <div className={css.errorContainer}>
      <h3 className={css.errorTitle}>Something went wrong!</h3>
      <p className={css.errorText}>
        Please refresh the page or try again later.
      </p>
    </div>
  );
}

export default ErrorMessage;
