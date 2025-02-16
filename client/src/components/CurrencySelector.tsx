import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Typography,
} from "@mui/material";

interface CurrencySelectorProps {
  selectedCurrencies: string[];
  onChange: (currencies: string[]) => void;
}

const availableCurrencies = ["BTC", "ETH", "LTC", "XRP", "ADA"];

const CurrencySelector = ({
  selectedCurrencies,
  onChange,
}: CurrencySelectorProps) => {
  const handleChange = (currency: string) => {
    const updatedCurrencies = selectedCurrencies.includes(currency)
      ? selectedCurrencies.filter((c) => c !== currency)
      : [...selectedCurrencies, currency];

    onChange(updatedCurrencies);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Выберите валюты
      </Typography>
      <FormGroup row>
        {availableCurrencies.map((currency) => (
          <FormControlLabel
            sx={{ m: "auto" }}
            key={currency}
            control={
              <Checkbox
                checked={selectedCurrencies.includes(currency)}
                onChange={() => handleChange(currency)}
              />
            }
            label={currency}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default CurrencySelector;
