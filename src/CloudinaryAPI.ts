import axios from "axios";

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

export default CloudinaryAPI;
