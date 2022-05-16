import { useEffect, useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import axios from "axios";

type CatImageProps = {
  askCount: number;
  catName: string;
  onImgReady: ((count: number) => void)
};

type Img = {
  public_id: string;
  created_at: string;
};

class CloudinaryAPI {
  static async list() {
    try {
      const { data } = await axios.get(
        "http://res.cloudinary.com/lpot/image/list/cat.json"
      );
      return { list: data.resources, error: null };
    } catch (err) {
      return { list: null, error: err };
    }
  }
}

const findImg = (list: Array<Img>, catName: string, askCount: number) => list
  .filter((el: Img) => el.public_id.startsWith(catName.trim().toLowerCase()))
  .sort(
    (a: Img, b: Img) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )[askCount || 0];

const CatImage = ({ askCount, catName, onImgReady }: CatImageProps) => {
  const [img, setImg] = useState<Img>();

  useEffect(() => {
    const getImages = async () => {
      const { list, error } = await CloudinaryAPI.list();
      if (error) {
        return;
      }

      setImg(findImg(list, catName, askCount));
      onImgReady(list.length-1);
    };
    getImages();
  }, [askCount, catName, onImgReady]);

  if (!img) return null;

  return (
    <CloudinaryContext cloudName="lpot">
      <>
        <Image style={{ height: "300px" }} publicId={img.public_id} />
        {/* <div className="desc">Created at {img.created_at}</div> */}
      </>
    </CloudinaryContext>
  );
};

export default CatImage;
