import axios from "axios";

async function getDetails(url) {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    alert(error);
  }
}

export default getDetails;
