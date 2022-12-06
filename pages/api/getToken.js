import axios from "axios";

const getAuthToken = async () => {
  return axios
    .post(
      `/fedex/oauth/token`,
      {
        client_id: process.env.CLIENT_ID,
        grant_type: process.env.GRANT_TYPE,
        client_secret: process.env.API_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.info(response.data);
      return response.data;
    })
    .catch((error) => {
      console.info("ERROR", error);
    });
};

export { getAuthToken };
