import Elysia from "elysia";
import { documentRouter } from "./document/router";

export const api = new Elysia({ prefix: "api" }).use(documentRouter)