import "dotenv/config";
import { app } from "./app";
import { startDatabase } from "./database/database";

const PORT = Number(process.env.PORT) || 3000;
const runningMsg = `Server running on http://localhost:${PORT}`;

app.listen(PORT, async (): Promise<void> => {
  await startDatabase();
  console.log(runningMsg);
});
