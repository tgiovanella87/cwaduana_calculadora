import { getAuthToken } from "./getToken";
import axios from "axios";

async function requestByLocation(data) {
  const token = await getAuthToken();

  const response = await axios.post(
    `/fedex/rate/v1/rates/quotes`,
    {
      accountNumber: {
        value: `${process.env.ACCOUNT_ID}`,
      },
      serviceType: "STANDARD_OVERNIGHT",
      packingType: "FEDEX_PAK",
      requestedShipment: {
        shipper: {
          address: {
            postalCode: `${data.cepOrigem}`,
            countryCode: `${data.origem}`,
          },
        },
        recipient: {
          address: {
            postalCode: `${data.cepDestino}`,
            countryCode: `${data.destino}`,
          },
        },
      },
    },
    {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
        "x-locale": `${process.env.LOCAL}`,
        "content-type": "application/json",
      },
    }
  );

  console.info(response);
}

export { requestByLocation };
