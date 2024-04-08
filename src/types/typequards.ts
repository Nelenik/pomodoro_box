interface RouteHandle {
  docTitle: () => void;
}

export function isRouteHandle(prop: unknown): prop is RouteHandle {
  return typeof prop === "object" && prop !== null && "docTitle" in prop;
}
