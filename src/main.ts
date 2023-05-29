import { app } from "./api";
import { PORT } from "./config";

app.listen(PORT, () =>
  console.log(`✅  Ready on port http://localhost:${PORT}`)
);
