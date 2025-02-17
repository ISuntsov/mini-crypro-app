import { FormEvent, useState, MouseEvent } from "react";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ethers } from "ethers";

interface ImportFormProps {
  onImport: (keyOrSeed: string) => void;
  isLoading: boolean;
  errorMessage: string;
}

const ImportForm = ({ onImport, isLoading, errorMessage }: ImportFormProps) => {
  const randomWallet = ethers.Wallet.createRandom();

  const [key, setKey] = useState(randomWallet.privateKey);
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onImport(key);
  };

  const handleShowKey = () => setShowKey((show) => !show);

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) =>
    e.preventDefault();

  const handleMouseUpPassword = (e: MouseEvent<HTMLButtonElement>) =>
    e.preventDefault();

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <OutlinedInput
        value={key}
        id="outlined-adornment-password"
        label="Введите приватный ключ"
        type={showKey ? "text" : "password"}
        onChange={(e) => setKey(e.target.value)}
        fullWidth
        error={!!errorMessage}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={`${showKey ? "Скрыть" : "Показать"} ключ`}
              onClick={handleShowKey}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
              color={errorMessage ? "error" : "default"}>
              {showKey ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        fullWidth
        sx={{ mt: 2 }}>
        {isLoading ? <CircularProgress size={24} /> : "Импорт"}
      </Button>
      {
        <Alert
          severity={"error"}
          sx={{ mt: 2, visibility: `${errorMessage ? "visible" : "hidden"}` }}>
          {errorMessage}
        </Alert>
      }
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography>Валидный ключ для теста:</Typography>
        <Typography fontSize={10}>
          0x5b2f77d3c08dd3bccaa19e62cf8742aa88452a864c0bf31c16c063f5b332ee36
        </Typography>
      </Box>
    </Box>
  );
};

export default ImportForm;
