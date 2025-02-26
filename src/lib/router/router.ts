import {
  // stores/router.ts
  createRouter,
  type InputPage,
  type RouterConfig,
  type SearchParams,
} from "@nanostores/router";

export const routes = {
  home: "/",
  app_home: "/app",
} as const;

export const $router = createRouter(routes, {
  links: false,
});

export type RouteProps = {
  to: InputPage<typeof routes, keyof typeof routes>["route"];
  params?: InputPage<typeof routes, keyof typeof routes>["params"];
  search?: SearchParams;
};
