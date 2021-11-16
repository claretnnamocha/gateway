import { Request } from "express";
import fetch from "node-fetch";

export const forward = async (baseURL: string, request: Request) => {
  const { body, headers, method, url: temp_url, path } = request;

  const route = path.split("/")[1];

  const url = baseURL + temp_url.replace(`/${route}`, "");

  const h = JSON.parse(JSON.stringify(headers));

  delete h.host;
  let response: any = await fetch(url, {
    body: method === "GET" ? null : body,
    headers: h,
    method,
  });

  const type: string = response.headers.get("content-type");

  console.log(url);

  response = await response.text();
  return { type, response };
};
