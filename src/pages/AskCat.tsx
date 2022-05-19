import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CloudinaryContext, Image } from "cloudinary-react";
import { Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import CloudinaryAPI from "../CloudinaryAPI";
import Title from "../components/Title";

import catHead from "../images/cat.png";
import catHead2 from "../images/whitecat.png";
import "../App.css";
import AnimatedCats from "../components/AnimatedCats";

type Img = {
  public_id: string;
  created_at: string;
};

const AskCat = () => {
  // const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [askCount, setAskCount] = useState(1);
  const [imgsCount, setImgsCount] = useState(0);
  const [img, setImg] = useState<Img>();

  const catName = "Roulette";

  const btnLabel =
    (askCount === 1 && "And Yesterday?") ||
    (askCount === 2 && "And the day before?") ||
    (askCount > 2 &&
      `And the day before ${[...Array(askCount -2)].map((c) => "before")}?`);

  useEffect(() => {
    const getImages = async () => {
      const { list, error } = await CloudinaryAPI.list();
      if (error) {
        return;
      }

      const image = list
        .filter((el: Img) =>
          el.public_id.startsWith(catName.trim().toLowerCase())
        )
        .sort(
          (a: Img, b: Img) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[askCount - 1];

      setImg(image);
      setImgsCount(list.length);
    };
    getImages();
  }, [askCount]);

  const handleAskCat = () => {
    setIsVisible(!isVisible);
  };
  console.log(askCount < imgsCount);

  return (
    <CloudinaryContext cloudName="lpot">
      <AnimatedCats className="ribbon" catHead={catHead} />

      <div className="App-content">
        {!isVisible ? (
          <Button type="ghost" size="large" onClick={() => handleAskCat()}>
            How is {catName} today?
          </Button>
        ) : (
          <>
            <Title askCount={askCount} catName={catName} />

            <Image style={{ height: "300px" }} publicId={img?.public_id} />
            <div className="buttons">
              {askCount + 1 < imgsCount ? (
                <Button
                  type="ghost"
                  size="large"
                  onClick={() => setAskCount((prev) => ++prev)}
                >
                  {btnLabel}
                </Button>
              ) : (
                <Button
                  type="ghost"
                  size="large"
                  icon={<LeftOutlined />}
                  onClick={() => {
                    setIsVisible(false);
                    setAskCount(0);
                  }}
                >
                  Go Back
                </Button>
              )}
            </div>
          </>
        )}
      </div>

      <AnimatedCats className="ribbon2" catHead={catHead2} />
    </CloudinaryContext>
  );
};

export default AskCat;
