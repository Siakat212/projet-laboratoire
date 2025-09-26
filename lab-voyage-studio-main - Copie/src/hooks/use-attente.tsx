import { useEffect } from "react";

export function useAttente(loading, setDelayedLoading) {
    useEffect(() => {
        let timer;
        if (!loading) {
        // quand les données sont prêtes, attendre quelque secondes avant d'enlever le loader
        timer = setTimeout(() => setDelayedLoading(false), 1000);
        }
        return () => clearTimeout(timer);
    }, [loading]);
}