import express from "express";
import cors from "cors";
import partnerRoutes from "./infrastructure/api/routes/partner.routes";

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", partnerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
