import { NextFunction, Request, Response, Router } from "express";
import { response } from "../helpers";
import { forward } from "../middlewares";

const routes = Router();

const URL_MAP = {
  admin: "https://api.google.com",
};

routes.use(async (request: Request, res: Response, next: NextFunction) => {
  const { path } = request;
  const route = path.split("/")[1];
  const baseURL = URL_MAP[route];

  if (!baseURL) return next();

  const { type, response } = await forward(baseURL, request);

  res.set("content-type", type);
  res.send(response);
});

routes.use((_: Request, res: Response) => {
  response(res, { status: false, message: "Route not found" }, 404);
});

export default routes;
