import { type AnchorHTMLAttributes, type MouseEventHandler } from "react";
import { $router, routes, type RouteProps } from "./router";
import { getPagePath } from "@nanostores/router";

/**
 * Just a type-safe wrapper around an anchor tag.
 */
export function Link({
  to,
  params,
  search,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & RouteProps) {
  return (
    <a
      href={getPagePath(
        $router,
        {
          route: to,
          params,
        },
        search
      )}
      {...props}
    />
  );
}
