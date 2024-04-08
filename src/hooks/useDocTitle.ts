import { useMatches } from "react-router-dom";
import { isRouteHandle } from "@/types/typequards";

export default function useDocTitle(): void {
  const [, route] = useMatches();
  isRouteHandle(route.handle) && route.handle.docTitle();
}
