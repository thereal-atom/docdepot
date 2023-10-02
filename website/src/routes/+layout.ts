import { inject } from "@vercel/analytics";
import { dev } from "$app/environment";
 
inject({ mode: dev ? "development" : "production" });