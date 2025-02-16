import { Request, Response } from "express";
import { ethers } from "ethers";

// Моковые данные для балансов
const balances: { [key: string]: number } = {
  BTC: 0.5,
  ETH: 2,
  LTC: 10,
  XRP: 500,
  ADA: 1000,
};

// Моковые данные для курсов валют
const rates: { [key: string]: number } = {
  BTC: 50000,
  ETH: 4000,
  LTC: 200,
  XRP: 1,
  ADA: 2,
};

let selectedCurrencies = ["BTC", "ETH", "LTC", "XRP", "ADA"];

export const handleImport = (req: Request, res: Response) => {
  const { key, address } = req.body;

  if (!key) {
    return res.status(400).json({ error: "Требуется ключ" });
  }

  try {
    const { address } = new ethers.Wallet(key);
    console.log("Импортирован ключ:", key);
    console.log("Сгенерированный адрес:", address);

    res.json({
      success: true,
      message: "Ключ успешно импортирован",
      address,
    });
  } catch (error) {
    res.status(400).json({ error: "Некорректный ключ" });
  }
};

export const handleCurrenciesUpdate = (req: Request, res: Response) => {
  const { currencies } = req.body;

  if (!currencies || !Array.isArray(currencies)) {
    return res.status(400).json({ error: "Неверный список валют" });
  }

  selectedCurrencies = currencies;
  res.json({
    success: true,
    message: "Валюты обновлены успешно",
    selectedCurrencies,
  });
};

export const handleBalancesGet = (req: Request, res: Response) => {
  const data = selectedCurrencies.map((currency) => ({
    currency,
    amount: balances[currency] || 0,
    usdValue: (balances[currency] || 0) * (rates[currency] || 0),
  }));

  res.json(data);
};
