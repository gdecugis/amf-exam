import { onRequestGet as __api_db_js_onRequestGet } from "/Users/guillaume/Dropbox/Coding Projects/amf-exam/functions/api/db.js"
import { onRequestOptions as __api_generate_js_onRequestOptions } from "/Users/guillaume/Dropbox/Coding Projects/amf-exam/functions/api/generate.js"
import { onRequestPost as __api_generate_js_onRequestPost } from "/Users/guillaume/Dropbox/Coding Projects/amf-exam/functions/api/generate.js"

export const routes = [
    {
      routePath: "/api/db",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_db_js_onRequestGet],
    },
  {
      routePath: "/api/generate",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_generate_js_onRequestOptions],
    },
  {
      routePath: "/api/generate",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_generate_js_onRequestPost],
    },
  ]