import { useState } from "react";
import Button from "./Button";

function Header() {
  const [dark, setDark] = useState(true);

  return (
    <header className={dark ? "header" : "header light"}>
      <h2>Gogoanime Downloader</h2>
      <Button handleClick={() => setDark(!dark)}>
        {dark ? "Light" : "Dark"} Theme
      </Button>
    </header>
  );
}

export default Header;
