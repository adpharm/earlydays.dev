import { setEnvDefaults, createActionURL, Auth, isAuthAction } from '@auth/core';
import GitHub from '@auth/core/providers/github';
import { parseString } from 'set-cookie-parser';

function defineConfig(config) {
  return config;
}

const authConfig$1 = defineConfig({
  providers: [
    GitHub({
      clientId: "Ov23liuKwfQ1tmNCQ6pQ",
      clientSecret: "6d3a06c4f6f171a01765383a12548f159153130f"
    })
  ]
});

const authConfig = (ctx) => {
            let resolvedConfig = typeof authConfig$1 === 'function' ? authConfig$1(ctx) : authConfig$1;
            resolvedConfig.basePath = '/auth';

            return resolvedConfig;
          };

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
function AstroAuthHandler(config) {
  return async (ctx) => {
    config ??= authConfig(ctx);
    setEnvDefaults(Object.assign(__vite_import_meta_env__, {}), config);
    const { basePath } = config;
    const { request, cookies } = ctx;
    const url = new URL(request.url);
    const action = url.pathname.slice(basePath.length + 1).split("/")[0];
    if (!isAuthAction(action) || !url.pathname.startsWith(basePath + "/")) {
      return;
    }
    const res = await Auth(request, config);
    if (["callback", "signin", "signout"].includes(action)) {
      res.headers.getSetCookie().forEach((cookie) => {
        const { name, value, ...options } = parseString(cookie);
        cookies.set(
          name,
          value,
          options
        );
      });
      res.headers.delete("Set-Cookie");
    }
    return res;
  };
}
function AstroAuth(config) {
  const handler = AstroAuthHandler(config);
  return {
    GET: handler,
    POST: handler
  };
}
async function auth(ctx, config) {
  config ??= authConfig(ctx);
  setEnvDefaults(Object.assign(__vite_import_meta_env__, {}), config);
  const protocol = ctx.request.headers.get("x-forwarded-proto") === "http" || Object.assign(__vite_import_meta_env__, {}).DEV ? "http" : "https";
  const url = createActionURL(
    "session",
    protocol,
    ctx.request.headers,
    Object.assign(__vite_import_meta_env__, {}),
    {
      basePath: config.basePath ?? "/auth"
    }
  );
  const response = await Auth(
    new Request(url, { headers: ctx.request.headers }),
    config
  );
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length) return null;
  if (status === 200) return data;
  throw new Error(data.message);
}

export { AstroAuth as A, auth as a };
