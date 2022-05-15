import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { useEffect, useState } from "react";

type CatImageProps = {
  askCount: number;
  catName: string;
  onImgReady: () => void;
};

const myCld = new Cloudinary({
  cloud: {
    cloudName: "lpot",
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});

const CatImage = ({ askCount, catName, onImgReady }: CatImageProps) => {
  const [img, setImg] = useState<CloudinaryImage>();
  useEffect(() => {
    let image =
      askCount && askCount < 5
        ? myCld.image(`${catName}_${askCount}`)
        : myCld.image(catName);

    image.resize(fill().height(350));
    setTimeout(() => {
      setImg(image);
      onImgReady();
    }, 900);
  }, [askCount, catName, onImgReady]);

  if (!img) return null;

  return <AdvancedImage cldImg={img} />;
};

export default CatImage;
