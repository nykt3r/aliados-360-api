import { createServer } from "./app";
import { env } from "./config/env";
import { printEnvironmentVariables } from "./util/envPrinter.util";

async function bootstrap() {

  const port = env.port;
  const app = createServer();

  const server = app.listen(port, async () => {
      console.log(`🚀 ${env.appName} v${env.appVersion}`);
      console.log(`🌎 Environment: ${env.nodeEnv}`);
      console.log(`📡 Running on http://localhost:${port}`);

      if (env.showEnv) {
        printEnvironmentVariables();
      }
  });

  const shutdown = async () => {
    console.info("🛑 Shutting down gracefully...");

    server.close(async () => {
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap();
