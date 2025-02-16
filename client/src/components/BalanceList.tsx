import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";

interface Balance {
  currency: string;
  amount: number;
  usdValue: number;
}

const BalanceList = ({ balances }: { balances: Balance[] }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Балансы
      </Typography>
      <List>
        {balances.map(({ currency, amount, usdValue }, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={currency}
              secondary={`${amount.toFixed(8)} ($${usdValue.toFixed(2)})`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default BalanceList;
