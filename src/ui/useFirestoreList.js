import { useEffect, useState } from "react";

/**
 * Runs `load` (returns a Firestore query snapshot promise) and exposes
 * { data, loading, error }. Re-runs when `deps` change.
 */
export default function useFirestoreList(load, deps) {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    load()
      .then((snap) => {
        if (cancelled) return;
        setState({ data: snap.docs.map((d) => ({ id: d.id, ...d.data() })), loading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ data: [], loading: false, error });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
