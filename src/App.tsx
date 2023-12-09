import { useEffect, useState } from "react";
import hole from "./assets/hole.png";
import mole from "./assets/mole.png";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [images, setImages] = useState<boolean[]>(new Array(9).fill(false));

  const checkClick = (bool: boolean, idx: number) => {
    if (bool) {
      setScore((prev) => prev + 1);
      setImages((curr) =>
        curr.map((sm, index) => (index === idx ? false : sm))
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setImages((curr) =>
        curr.map((sm, index) => (index === randomIndex ? true : sm))
      );

      setTimeout(() => {
        setImages((curr) =>
          curr.map((sm, index) => (index === randomIndex ? false : sm))
        );
      }, 700);
    }, 1000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <h1>Score: {score}</h1>
      <div className="grid">
        {images.map((singleImage, idx) => (
          <img
            key={idx}
            src={singleImage ? mole : hole}
            draggable={false}
            onClick={() => checkClick(singleImage, idx)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
