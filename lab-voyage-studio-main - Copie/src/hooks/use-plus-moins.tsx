import * as React from "react"

export function usePluseMoins(liste, setListe, tailleListeAll, listeAll, parSaut) {
    
    const plus  = () => {
        const newListe = []
        const tailleNewListe = liste.length + parSaut > listeAll.length ? listeAll.length : liste.length + parSaut
        for (let index = 0; index < tailleNewListe ; index++) {
            newListe.push(listeAll[index])
        }
        setListe(newListe)
    }

    const moins  = () => {
        const newListe = []
        const tailleNewListe = liste.length - parSaut < parSaut ? parSaut : liste.length - parSaut
        for (let index = 0; index < tailleNewListe ; index++) {
            newListe.push(listeAll[index])
        }
        setListe(newListe)
    }

    return {plus , moins, parSaut}
  
}
