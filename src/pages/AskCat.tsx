import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import { Button } from "antd";
// import { RightOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons";
import Title from "../components/Title";
import CatImage from "../components/CatImage";

import catHead from "../images/cat.png";
import catHead2 from "../images/whitecat.png";
import "../App.css";

const AskCat = () => {
  // const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [askCount, setAskCount] = useState(0);
  const [imgIsReady, setImgIsReady] = useState(false);

  const handleAskCat = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="ribbon">
        {[...Array(10)].map((_, idx) => (
          <img key={idx} src={catHead} className="App-logo" alt="logo" />
        ))}
      </div>

      <div className="App-content">
        {isVisible && (
          <>
            <Title
              askCount={askCount}
              catName={"Roulette"}
              imgIsReady={imgIsReady}
            />
            <CatImage
              onImgReady={() => setImgIsReady(true)}
              askCount={askCount}
              catName={"roulette/roulette"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {askCount < 5 ? (
                <Button
                  type="ghost"
                  size="large"
                  onClick={() => {
                    setAskCount((prev) => ++prev);
                    setImgIsReady(false);
                  }}
                >
                  Again?
                </Button>
              ) : (
                <Button
                  type="ghost"
                  size="large"
                  icon={<LeftOutlined />}
                  onClick={() => {
                    setIsVisible(false);
                    setAskCount(0);
                    setImgIsReady(false);
                  }}
                >
                  Go Back
                </Button>
              )}
              {/* {!!askCount && (
                <Button
                  type="ghost"
                  size="large"
                  onClick={() => {
                    setIsVisible(false);
                    setAskCount(0);
                    navigate("/search", { replace: true });
                  }}
                >
                  Check others cats
                  <RightOutlined />
                </Button>
              )} */}
            </div>
          </>
        )}
        {!isVisible && (
          <Button type="ghost" size="large" onClick={() => handleAskCat()}>
            How is Roulette?
          </Button>
        )}
      </div>

      <div className="ribbon2">
        {[...Array(10)].map((_, idx) => (
          <img key={idx} src={catHead2} className="App-logo" alt="logo" />
        ))}
      </div>
    </>
  );
};

export default AskCat;
