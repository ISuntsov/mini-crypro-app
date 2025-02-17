import {
  Container,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import { useActionsAuth } from "../store/auth.reducer";
import { useActionsCurrencies } from "../store/currencies.reducer";
import { currencies } from "@/store/currencies.selector";
import {
  authStatusSelector,
  authAddressSelector,
  authErrorSelector,
} from "@/store/auth.selector";

import {
  useLazyFetchBalancesQuery,
  useImportKeyMutation,
  useUpdateCurrenciesMutation,
} from "../services/api";
import ImportForm from "../components/ImportForm";
import BalanceList from "../components/BalanceList";
import CurrencySelector from "../components/CurrencySelector";

export default function Home() {
  const isAuthenticated = useSelector(authStatusSelector);
  const authAddress = useSelector(authAddressSelector);
  const authError = useSelector(authErrorSelector);
  const selectedCurrencies = useSelector(currencies);

  const [fetchBalances, { data: balances = [], isLoading: isBalancesLoading }] =
    useLazyFetchBalancesQuery();
  const [importKey, { isLoading: isImporting }] = useImportKeyMutation();
  const [updateCurrencies] = useUpdateCurrenciesMutation();

  const { setAddress, setAuthenticated, setErrorMessage } = useActionsAuth();
  const { setSelectedCurrencies } = useActionsCurrencies();

  const handleImport = async (key: string) => {
    setAddress("");
    setErrorMessage("");

    try {
      const response = await importKey({ key }).unwrap();
      setAuthenticated(true);
      setAddress(response.address || "");
    } catch (error) {
      setAuthenticated(false);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Произошла неизвестная ошибка.");
      }
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setAddress("");
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}>
          <Typography variant="h4" component="h1" align="center">
            Баланс криптовалют
          </Typography>
          {isAuthenticated && (
            <Button onClick={handleLogout} variant="contained" color="warning">
              Выйти
            </Button>
          )}
        </Box>
        {!isAuthenticated ? (
          <ImportForm
            onImport={handleImport}
            isLoading={isImporting}
            errorMessage={authError}
          />
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Адрес кошелька: {authAddress}
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
              sx={{ mb: 4 }}
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
