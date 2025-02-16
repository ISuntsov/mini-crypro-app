import ky from "ky";
import { ethers } from "ethers";

const api = ky.create({ prefixUrl: "/api" });

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

export const fetchBalances = async (): Promise<Balance[]> => {
  return api.get("balances").json();
};

export const importKey = async (key: string): Promise<ImportResponse> => {
  if (!key.trim()) {
    throw new Error("Ключ не может быть пустым");
  }

  try {
    let wallet;
    key.split(" ").length > 1
      ? (wallet = ethers.Wallet.fromPhrase(key))
      : (wallet = new ethers.Wallet(key));

    const address = wallet.address;

    console.log("Запрос на API с:", { key, address });

    const response: ImportResponse = await api
      .post("import", { json: { key, address } })
      .json();

    return { ...response, address };
  } catch (error) {
    console.error(error);
    throw new Error("Не удалось сгенерировать адрес кошелька.");
  }
};

export const updateCurrencies = async (
  currencies: string[]
): Promise<ImportResponse> => {
  return api.put("currencies", { json: { currencies } }).json();
};
