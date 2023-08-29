export default function Button({ children, type, handleClick }) {
  return (
    <button className="button" type={type || "button"} onClick={handleClick}>
      {children}
    </button>
  );
}
