import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import formdata from "express-form-data";
import { env, security } from "./configs";
import { response } from "./helpers";
import routes from "./routes";

config();
const app = express();
const port: number = env.port;

app.use(formdata.parse());
app.use(express.json({ limit: "100mb", type: "application/json" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());

security.lock(app);

app.use("", routes);

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  return response(
    res,
    { status: false, message: `Internal server error: ${err.message}` },
    500
  );
});

if (require.main) {
  app.listen(port, () => {
    console.log(
      `API gateway is running on http://localhost:${port} (${env.env})`
    );
  });
}

export default app;
