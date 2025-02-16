import { FormEvent, useState } from "react";
import { updateCurrencies } from "../services/api";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const CurrencyEditor = () => {
  const [currencies, setCurrencies] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const currenciesArray = currencies.split(",").map((c) => c.trim());
    if (currenciesArray.length > 5) {
      setMessage("Можно добавить не более 5 валют.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await updateCurrencies(currenciesArray);
      setMessage(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Ошибка: ${error.message}`);
      } else {
        setMessage("Произошла неизвестная ошибка.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label="Введите валюту (через запятую, максимум 5)"
        value={currencies}
        onChange={(e) => setCurrencies(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        fullWidth
        sx={{ mt: 2 }}>
        {isLoading ? <CircularProgress size={24} /> : "Обновление валют"}
      </Button>
      {message && (
        <Alert
          severity={message.includes("Ошибка") ? "error" : "success"}
          sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default CurrencyEditor;
