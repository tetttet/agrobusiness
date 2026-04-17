"use client";

import { useCallback, useSyncExternalStore } from "react";

const WISHLIST_STORAGE_KEY = "agro:wishlist";

type WishlistSnapshot = {
  ids: number[];
  hydrated: boolean;
};

const INITIAL_WISHLIST_SNAPSHOT: WishlistSnapshot = {
  ids: [],
  hydrated: false,
};

let snapshot: WishlistSnapshot = INITIAL_WISHLIST_SNAPSHOT;

const listeners = new Set<() => void>();
let listenersBound = false;

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const sanitizeWishlistIds = (value: unknown) => {
  if (!Array.isArray(value)) return [];

  const uniqueIds = new Set<number>();

  value.forEach((item) => {
    const normalized =
      typeof item === "number" ? item : Number.parseInt(String(item), 10);

    if (Number.isInteger(normalized) && normalized > 0) {
      uniqueIds.add(normalized);
    }
  });

  return Array.from(uniqueIds);
};

const readWishlistSnapshot = (): WishlistSnapshot => {
  if (typeof window === "undefined") {
    return snapshot;
  }

  try {
    const rawValue = window.localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (!rawValue) {
      return { ids: [], hydrated: true };
    }

    return {
      ids: sanitizeWishlistIds(JSON.parse(rawValue)),
      hydrated: true,
    };
  } catch {
    return { ids: [], hydrated: true };
  }
};

const updateSnapshot = (nextSnapshot: WishlistSnapshot) => {
  snapshot = nextSnapshot;
  emitChange();
};

const syncWishlistFromStorage = () => {
  updateSnapshot(readWishlistSnapshot());
};

const handleStorage = (event: StorageEvent) => {
  if (event.key === WISHLIST_STORAGE_KEY) {
    syncWishlistFromStorage();
  }
};

const ensureWishlistListeners = () => {
  if (listenersBound || typeof window === "undefined") {
    return;
  }

  listenersBound = true;
  window.addEventListener("storage", handleStorage);
  syncWishlistFromStorage();
};

const persistWishlistIds = (ids: number[]) => {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedIds = sanitizeWishlistIds(ids);

  try {
    window.localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(normalizedIds),
    );
  } catch {
    return;
  }

  updateSnapshot({
    ids: normalizedIds,
    hydrated: true,
  });
};

const updateWishlist = (updater: (ids: number[]) => number[]) => {
  const currentIds = snapshot.hydrated
    ? snapshot.ids
    : readWishlistSnapshot().ids;

  persistWishlistIds(updater(currentIds));
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  ensureWishlistListeners();

  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => snapshot;

const getServerSnapshot = (): WishlistSnapshot => INITIAL_WISHLIST_SNAPSHOT;

export const useWishlist = () => {
  const currentSnapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const add = useCallback((productId: number) => {
    updateWishlist((ids) =>
      ids.includes(productId) ? ids : [productId, ...ids],
    );
  }, []);

  const remove = useCallback((productId: number) => {
    updateWishlist((ids) => ids.filter((id) => id !== productId));
  }, []);

  const toggle = useCallback((productId: number) => {
    updateWishlist((ids) =>
      ids.includes(productId)
        ? ids.filter((id) => id !== productId)
        : [productId, ...ids],
    );
  }, []);

  const clear = useCallback(() => {
    persistWishlistIds([]);
  }, []);

  const has = useCallback(
    (productId: number) => currentSnapshot.ids.includes(productId),
    [currentSnapshot.ids],
  );

  return {
    ids: currentSnapshot.ids,
    count: currentSnapshot.ids.length,
    hydrated: currentSnapshot.hydrated,
    has,
    add,
    remove,
    toggle,
    clear,
  };
};
