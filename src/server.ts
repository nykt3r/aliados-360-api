import { createServer } from "./app";

const PORT = process.env.PORT || 3000;

const server = createServer();

server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
