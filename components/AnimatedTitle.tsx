import React, { useState, useEffect } from "react";

const Title = "Manikanta Inugurthi";

const AnimatedTitle = () => {
  const [text, setText] = useState(Title);

  useEffect(() => {
    var iteration = 1;
    const intervalId = setInterval(() => {
      setText((prevText) =>
        prevText
          .split("")
          .map((_, index) => {
            const letter = Title[index];
            if (index < iteration) {
              return letter;
            }

            if (letter >= "A" && letter <= "Z") {
              return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            } else if (letter >= "a" && letter <= "z") {
              return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            } else {
              return letter;
            }
          })
          .join("")
      );
      if (iteration >= Title.length) {
        clearInterval(intervalId);
      }
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1
      style={{ fontFamily: "Space Mono, monospace" }}
      className="
    text-2xl 
    md:text-4xl 
    tracking-tight mb-1
     text-black 
     dark:text-white"
    >
      {text}
    </h1>
  );
};

export default AnimatedTitle;
