import express from "express";
import cors from "cors";
import {
  handleBalancesGet,
  handleCurrenciesUpdate,
  handleImport,
} from "./routeHandlers";

const app = express();
const router = express.Router();
app.use(express.json());

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// @ts-ignore
router.post("/api/import", handleImport);
// @ts-ignore
router.put("/api/currencies", handleCurrenciesUpdate);
router.get("/api/balances", handleBalancesGet);

app.use(router);

const port = 3001;
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
