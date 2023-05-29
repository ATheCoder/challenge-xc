import { app } from "./api";
import { PORT } from "./config";
import { establishMongoDBConnection } from "./utils/db-connection";

establishMongoDBConnection().then(() => {
  app.listen(PORT, () =>
    console.log(`✅  Ready on port http://localhost:${PORT}`)
  );
});
