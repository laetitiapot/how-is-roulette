import React, { useState, useEffect, useMemo } from "react";

const style = {
  color: "white",
};

type TitleProps = {
  askCount: number;
  catName: string;
  imgIsReady: boolean;
};

let timeout: ReturnType<typeof setTimeout>;

const getRandom = (list: Array<string>) => {
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
};
const Title = ({ askCount, catName, imgIsReady }: TitleProps) => {
  const titles = useMemo(
    () => [
      `${catName} is fine`,
      `${catName} is chilling`,
      `${catName} is alright`,
      `${catName} is great`,
      `${catName} is doing okey dokey`,
    ],
    [catName]
  );

  const randomTitle = getRandom(titles);
  const [title, setTitle] = useState(randomTitle);

  useEffect(() => {
    let increment = 0;
    const getTitle = () => {
      ++increment;
      setTitle(getRandom(titles));
      timeout = setTimeout(getTitle, 50);
      if (imgIsReady || increment > 12) {
        clearTimeout(timeout);
      }
    };
    getTitle();
  }, [askCount, titles, imgIsReady]);

  return <h1 style={style}>{title}</h1>;
};

export default Title;
