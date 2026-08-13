import { useEffect, useState } from "react";

/**
 * Petit magasin d'état partagé, persistant dans localStorage.
 *
 * Les écrans d'administration modifiaient des tableaux importés : l'action
 * affichait un toast mais ne changeait rien, et repartait à zéro d'un écran à
 * l'autre. Ce module donne un état unique, observable par tous les composants,
 * en attendant que ces mutations deviennent des appels API.
 *
 * `seed` fournit les valeurs de départ ; seules les modifications de
 * l'utilisateur sont enregistrées, ce qui permet de faire évoluer les données
 * de démonstration sans figer d'anciennes copies dans le navigateur.
 */
type Listener = () => void;

interface Store<T> {
  get: () => T;
  set: (updater: (current: T) => T) => void;
  reset: () => void;
  subscribe: (listener: Listener) => () => void;
}

const createStore = <T,>(key: string, seed: T): Store<T> => {
  const listeners = new Set<Listener>();
  let value: T | undefined;

  const read = (): T => {
    if (value !== undefined) return value;

    if (typeof window === "undefined") {
      value = seed;
      return value;
    }

    const stored = window.localStorage.getItem(key);
    if (!stored) {
      value = seed;
      return value;
    }

    try {
      value = JSON.parse(stored) as T;
    } catch {
      window.localStorage.removeItem(key);
      value = seed;
    }

    return value as T;
  };

  const write = (next: T) => {
    value = next;
    window.localStorage.setItem(key, JSON.stringify(next));
    listeners.forEach((listener) => listener());
  };

  return {
    get: read,
    set: (updater) => write(updater(read())),
    reset: () => {
      window.localStorage.removeItem(key);
      value = seed;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

/** Abonne un composant à un magasin et le re-rend à chaque modification. */
const useStore = <T,>(store: Store<T>): T => {
  const [value, setValue] = useState(store.get);

  useEffect(() => store.subscribe(() => setValue(store.get())), [store]);

  return value;
};

export { createStore, useStore };
export type { Store };
