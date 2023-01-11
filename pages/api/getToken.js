import axios from "axios";

const getAuthToken = async () => {
  return axios({
    url: `/fedex/oauth/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "post",
    data: {
      grant_type: process.env.GRANT_TYPE,
      client_id: process.env.API_KEY,
      client_secret: process.env.SECRET_KEY,
    },
  })
    .then((response) => {
      console.info(response.data);
      return response.data;
    })
    .catch((error) => {
      console.info("ERROR", error);
    });
};

export { getAuthToken };
