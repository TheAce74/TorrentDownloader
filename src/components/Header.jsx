import { useState } from "react";
import Button from "./Button";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Header() {
  const { getItem, setItem } = useLocalStorage();
  const [dark, setDark] = useState(
    getItem("theme") ? (getItem("theme") === "dark" ? true : false) : true
  );

  const handleSetDark = (bool) => {
    if (bool) {
      setItem("theme", "dark");
    } else {
      setItem("theme", "light");
    }
    setDark(bool);
  };

  return (
    <header className={dark ? "header" : "header light"}>
      <h2>Gogoanime Downloader</h2>
      <Button handleClick={() => handleSetDark(!dark)}>
        {dark ? "Light" : "Dark"} Theme
      </Button>
    </header>
  );
}

export default Header;
