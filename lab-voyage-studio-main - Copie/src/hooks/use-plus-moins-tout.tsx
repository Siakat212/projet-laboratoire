import * as React from "react"

export function usePluseMoinsTout(liste, setListe, tailleListeAll, listeAll, parSaut) {
    
    const plus  = () => {
        setListe(listeAll)
    }

    const moins  = () => {
        const newListe = []
        for (let index = 0; index < parSaut ; index++) {
            newListe.push(listeAll[index])
        }
        setListe(newListe)
    }

    return [plus , moins, parSaut]
  
}
