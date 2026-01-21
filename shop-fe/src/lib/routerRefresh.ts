let listeners = new Set<() => void>();

export function requestRouterRefresh() {
  listeners.forEach((l) => l());
}

export function subscribeRouterRefresh(cb: () => void): () => void {
  listeners.add(cb);

  return () => {
    listeners.delete(cb);
  };
}
