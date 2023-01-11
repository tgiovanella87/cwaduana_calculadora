import { getAuthToken } from "./getToken";
import axios from "axios";

async function requestByLocation(data) {
  console.info(data);

  let totalWeight = 0;
  const commodities = data.produtos.map((item) => {
    totalWeight += +item.peso;

    return {
      description: item.descricao,
      quantity: item.quantidade,
      weight: { unity: "KG", value: item.peso },
      quantityUnits: "PCS",
      customsValue: { amount: item.valor, currency: "USD" },
    };
  });

  const token = await getAuthToken();
  const response = await axios({
    url: `/fedex/rate/v1/rates/quotes`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      accountNumber: { value: process.env.ACCOUNT_ID },
      requestedShipment: {
        shipper: {
          address: { postalCode: data.cepOrigem, countryCode: data.origem },
        },
        recipient: {
          address: { postalCode: data.cepDestino, countryCode: data.destino },
        },
        shipDateStamp: "2020-07-03",
        pickupType: process.env.PICKUP_TYPE,
        serviceType: process.env.SERVICE_TYPE,
        shipmentSpecialServices: { specialServiceTypes: ["HOLD_AT_LOCATION"] },
        rateRequestType: ["ACCOUNT"],
        customsClearanceDetail: {
          dutiesPayment: {
            paymentType: "SENDER",
            payor: { responsibleParty: null },
          },
          commodities: commodities,
          // commodities: [
          //   {
          //     description: "Camera",
          //     quantity: 1,
          //     quantityUnits: "PCS",
          //     weight: { units: "KG", value: 11 },
          //     customsValue: { amount: 100, currency: "SFR" },
          //   },
          // ],
        },
        requestedPackageLineItems: [
          {
            weight: { units: "KG", value: totalWeight },
            packageSpecialServices: {
              specialServiceTypes: ["SIGNATURE_OPTION"],
              signatureOptionType: "ADULT",
            },
          },
        ],
      },
    },
  });

  console.info(response);
}

export { requestByLocation };
