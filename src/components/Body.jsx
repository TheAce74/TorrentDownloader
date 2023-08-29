import { useRef, useState } from "react";
import Button from "./Button";
import Swal from "sweetalert2";
import Loader from "./Loader";

function Body() {
  const url = useRef(null);
  const [loader, setLoader] = useState(false);

  const getEpisodeCount = async (url) => {
    try {
      const response = await fetch(url);
      const pageContent = await response.text();
      return Number(
        pageContent
          .slice(
            pageContent.indexOf("ep_end = '"),
            pageContent.indexOf(">", pageContent.indexOf("ep_end = '"))
          )
          .replace("ep_end = '", "")
          .replace("'", "")
      );
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "info",
        color: "var(--clr-text)",
        background: "var(--clr-background)",
        confirmButtonText: "Retry",
        confirmButtonColor: "var(--clr-primary-500)",
      });
    }
  };

  const getDownloadLink = async (url) => {
    try {
      const response = await fetch(url);
      const pageContent = await response.text();
      return pageContent
        .slice(
          pageContent.indexOf("dowloads"),
          pageContent.indexOf("target", pageContent.indexOf("dowloads"))
        )
        .replace(`dowloads"><a href="`, "")
        .replace(`"`, "");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "info",
        color: "var(--clr-text)",
        background: "var(--clr-background)",
        confirmButtonText: "Retry",
        confirmButtonColor: "var(--clr-primary-500)",
      });
    }
  };

  const showManual = () => {
    const text = `Unlock the magic of Gogoanime! Seamlessly fetch anime content. Just visit Gogoanime, search your favorite, copy the url (like "https://gogoanimehd.io/category/oshi-no-ko"), and unleash the power here!`;
    Swal.fire({
      title: "User Guide",
      text: text,
      icon: "info",
      color: "var(--clr-text)",
      background: "var(--clr-background)",
      confirmButtonText: "Got it!",
      confirmButtonColor: "var(--clr-primary-400)",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loader) return;
    setLoader(true);
    const link = url.current.value;
    const episodes = await getEpisodeCount(link);
    const episodesArray = [];
    for (let i = 1; i <= episodes; i++) {
      episodesArray.push(i);
    }
    e.target.reset();
    const downloadPageArray = [];
    episodesArray.forEach(async (episode) => {
      const url = link.replace("category/", "").concat(`-episode-${episode}`);
      const newUrl = await getDownloadLink(url);
      downloadPageArray.push(newUrl);
    });
    const interval = setInterval(() => {
      setLoader(false);
      if (downloadPageArray.length === episodesArray.length) {
        downloadPageArray.forEach((item) => {
          const link = document.createElement("a");
          link.setAttribute("href", item);
          link.setAttribute("target", "_blank");
          document.getElementById("root").appendChild(link);
          link.click();
          document.getElementById("root").removeChild(link);
        });
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <main className="body">
      <h1>AnimeMagic: Your Ultimate Download Destination!</h1>
      <p>
        Dive into a World of Anime Delight! Introducing the Ultimate Anime
        Downloader - Your Gateway to Unlimited Entertainment. Choose Your
        quality, batch download with ease, and embrace a user-friendly
        adventure!
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          ref={url}
          placeholder="Paste the Gogoanime link here"
          required
        />
        <div className="buttons">
          <Button type="submit">
            {loader ? <Loader /> : <span>Download</span>}
          </Button>
          <Button handleClick={showManual}>Guide</Button>
        </div>
      </form>
    </main>
  );
}

export default Body;
