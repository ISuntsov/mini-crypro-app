import { useState } from "react";
import {
  useLazyFetchBalancesQuery,
  useImportKeyMutation,
  useUpdateCurrenciesMutation,
} from "../services/api";
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
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [fetchBalances, { data: balances = [], isLoading: isBalancesLoading }] =
    useLazyFetchBalancesQuery();
  const [importKey, { isLoading: isImporting }] = useImportKeyMutation();
  const [updateCurrencies] = useUpdateCurrenciesMutation();

  const handleImport = async (key: string) => {
    setAddress("");
    setErrorMessage("");

    try {
      const response = await importKey({ key }).unwrap();
      setIsAuthenticated(true);
      setAddress(response.address || "");
    } catch (error) {
      setIsAuthenticated(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Произошла неизвестная ошибка.");
      }
    }
  };

  const handleFetchBalances = async () => {
    try {
      await fetchBalances().unwrap();
    } catch (error) {
      console.error("Ошибка получения балансов:", error);
    }
  };

  const handleCurrencyChange = async (currencies: string[]) => {
    setSelectedCurrencies(currencies);

    try {
      await updateCurrencies({ currencies }).unwrap();
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
            isLoading={isImporting}
            errorMessage={errorMessage}
          />
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Адрес кошелька: {address}
            </Typography>
            <CurrencySelector
              selectedCurrencies={selectedCurrencies}
              onChange={handleCurrencyChange}
            />
            <Button
              onClick={handleFetchBalances}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 4 }}
              disabled={isBalancesLoading}>
              {isBalancesLoading ? (
                <CircularProgress size={24} />
              ) : (
                "Загрузка балансов"
              )}
            </Button>
            <BalanceList balances={filteredBalances} />
          </>
        )}
      </Box>
    </Container>
  );
}
