import { useState } from "react";
import { fetchBalances, importKey, updateCurrencies } from "../services/api";
import {
  Container,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

import ImportForm from "../components/ImportForm";
import BalanceList from "../components/BalanceList";
import CurrencySelector from "../components/CurrencySelector";

interface Balance {
  currency: string;
  amount: number;
  usdValue: number;
}

export default function Home() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImport = async (key: string) => {
    setIsLoading(true);
    setAddress("");
    setErrorMessage("");

    try {
      const response = await importKey(key);
      setIsAuthenticated(true);
      setAddress(response.address || "");
    } catch (error) {
      setIsAuthenticated(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Произошла неизвестная ошибка.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchBalances = async () => {
    setIsLoading(true);

    try {
      const data = await fetchBalances();
      setBalances(data);
    } catch (error) {
      console.error("Ошибка получения балансов:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrencyChange = async (currencies: string[]) => {
    setSelectedCurrencies(currencies);

    try {
      await updateCurrencies(currencies);
    } catch (error) {
      console.error("Ошибка обновления валют:", error);
    }
  };

  const filteredBalances = balances.filter((balance) =>
    selectedCurrencies.includes(balance.currency)
  );

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Баланс криптовалют
        </Typography>
        {!isAuthenticated ? (
          <ImportForm
            onImport={handleImport}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Адрес кошелька: {address}
            </Typography>{" "}
            <CurrencySelector
              selectedCurrencies={selectedCurrencies}
              onChange={handleCurrencyChange}
            />
            <Button
              onClick={handleFetchBalances}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 4 }}>
              Загрузка балансов
            </Button>
            <BalanceList balances={filteredBalances} />
          </>
        )}
      </Box>
    </Container>
  );
}
