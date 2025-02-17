import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ethers } from "ethers";

interface Balance {
  currency: string;
  amount: number;
  usdValue: number;
}

interface ImportResponse {
  success: boolean;
  message: string;
  address?: string;
}

interface CurrenciesResponse {
  success: boolean;
  message: string;
  currencies: string[];
}

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    importKey: builder.mutation<ImportResponse, { key: string }>({
      query: (body) => {
        let wallet;
        const { key } = body;
        if (!key.trim()) {
          throw new Error("Ключ не может быть пустым");
        }

        try {
          key.split(" ").length > 1
            ? (wallet = ethers.Wallet.fromPhrase(key))
            : (wallet = new ethers.Wallet(key));

          const address = wallet.address;

          console.log("Запрос на API с:", { key: key, address });

          return {
            url: "/import",
            method: "POST",
            body: { key: key, address },
          };
        } catch (error) {
          console.error(error);
          throw new Error("Не удалось сгенерировать адрес кошелька.");
        }
      },
    }),

    updateCurrencies: builder.mutation<
      CurrenciesResponse,
      { currencies: string[] }
    >({
      query: (body) => ({
        url: "/currencies",
        method: "PUT",
        body,
      }),
    }),

    fetchBalances: builder.query<Balance[], void>({
      query: () => "/balances",
    }),
  }),
});

export const {
  useImportKeyMutation,
  useUpdateCurrenciesMutation,
  useLazyFetchBalancesQuery,
} = cryptoApi;
