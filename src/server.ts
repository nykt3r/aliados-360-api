import { createServer } from "./app";
import { env } from "./config/env";
import { connectDatabase, closeDatabase } from "./infrastructure/persistence/database/postgre";
import { printEnvironmentVariables } from "./util/envPrinter.util";

async function launch() {

  const port = env.port;
  const app = createServer();

  const server = app.listen(port, async () => {
      console.log(`🚀 ${env.appName} v${env.appVersion}`);
      console.log(`🌎 Environment: ${env.nodeEnv}`);
      console.log(`📡 Running on http://localhost:${port}`);

      try {
        await connectDatabase();
        console.log("✅ Database connected");
      } catch (error) {
        console.error("❌ Database connection failed");
      }

      if (env.showEnv) {
        printEnvironmentVariables();
      }
  });

  const shutdown = async () => {
    console.info("🛑 Shutting down gracefully...");

    server.close(async () => {
      await closeDatabase();
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

launch();
