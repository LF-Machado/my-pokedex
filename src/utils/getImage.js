import axios from "axios";

async function getImage(url) {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    alert.log(error);
  }
}

export default getImage;
