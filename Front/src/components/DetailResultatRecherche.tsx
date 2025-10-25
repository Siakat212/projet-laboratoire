import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, User, MapPin, Eye, Share2, CheckCircle2, AlertCircle, Clock, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Constants } from "../constants/Constants";

// Interfaces TypeScript pour les données de l'API
interface Objectif {
  id: number;
  objectif: string;
  creer_le: string;
  mise_a_jour_le: string;
}

interface JournalEntry {
  id: number;
  titre: string;
  date_activite: string;
  heure_debut?: string;
  heure_fin?: string;
  auteur: string;
  details: string;
  observations?: string;
  equipement_utilise?: string;
  lieu?: string;
  conditions_meteo?: string;
  creer_le: string;
  mise_a_jour_le: string;
}

interface Materiel {
  id: number;
  type_materiel: string;
  nom: string;
  reference?: string;
  quantite: number;
  unite: string;
  description?: string;
  fournisseur?: string;
  cout_unitaire?: number;
  creer_le: string;
  mise_a_jour_le: string;
}

interface Resultat {
  id: number;
  type_resultat: string;
  titre: string;
  description: string;
  valeur_numerique?: number;
  unite_mesure?: string;
  fichier_resultat?: string;
  fichier_resultat_url?: string;
  image_resultat?: string;
  image_resultat_url?: string;
  ordre: number;
  creer_le: string;
  mise_a_jour_le: string;
}

interface EquipeMember {
  id: number;
  id_chercheur?: number;
  role_equipe: string;
  nom_chercheur?: string;
  prenom_chercheur?: string;
  photo_chercheur?: string;
  nom_complet?: string;
  creer_le: string;
  mise_a_jour_le: string;
}

interface Methodologie {
  id: number;
  type_methode: string;
  titre: string;
  description: string;
  etapes?: string;
  criteres_evaluation?: string;
  limitations?: string;
  ordre: number;
  creer_le: string;
  mise_a_jour_le: string;
}

interface DetailData {
  id: number;
  date_resultat: string;
  creer_le: string;
  mise_a_jour_le: string;
  titre_recherche: string;
  description_recherche: string;
  statu_recherche: string;
  periode_recherche?: string;
  budget_recherche?: number;
  nombre_chercheurs: number;
  objectifs: Objectif[];
  journal_entries: JournalEntry[];
  materiel: Materiel[];
  resultats: Resultat[];
  equipe: EquipeMember[];
  methodologies: Methodologie[];
}

const tabs = [
  "Vue d'ensemble",
  'Méthodologie',
  'Matériel',
  'Journal',
  'Résultats',
  'Équipe'
];

const DetailResultatRecherche = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [active, setActive] = useState<string>(tabs[0]);
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("ID du résultat de recherche manquant");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${Constants.url}/labo_api/detail_resultat_recherche/${id}`);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.data) {
          setData(result.data);
        } else {
          throw new Error("Aucune donnée trouvée");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-10 lg:py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Chargement des données...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-10 lg:py-12 px-4">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Erreur de chargement</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Retour
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto py-10 lg:py-12 px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Aucune donnée trouvée</h2>
          <p className="text-muted-foreground mb-4">Le résultat de recherche demandé n'existe pas.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 lg:py-12 px-4">
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-primary rounded-full px-3 py-1.5 h-auto hover:bg-muted hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour
        </Button>
      </div>

      <Card className="mb-6 rounded-2xl shadow-sm border border-border/60 transition-shadow duration-300 hover:shadow-lg focus-within:shadow-lg transform hover:-translate-y-0.5 focus-within:-translate-y-0.5 hover:ring-2 focus-within:ring-2 ring-border/40">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-emerald-500/15 text-emerald-700">{data.statu_recherche}</Badge>
            <Badge variant="secondary">Recherche</Badge>
          </div>
          <CardTitle className="text-2xl lg:text-3xl">{data.titre_recherche}</CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> <span>Période: {data.periode_recherche || 'Non spécifiée'}</span></div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> <span>Résultat: {new Date(data.date_resultat).toLocaleDateString('fr-FR')}</span></div>
            <div className="flex items-center gap-2"><User className="h-4 w-4" /> <span>Équipe: {data.nombre_chercheurs} chercheur(s)</span></div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> <span>Budget: {data.budget_recherche ? `${data.budget_recherche.toLocaleString()} FCFA` : 'Non spécifié'}</span></div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-2" />
          <p className="text-muted-foreground mt-4">{data.description_recherche}</p>
        </CardContent>
      </Card>

      <div className="sticky top-20 z-10 mb-6 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="w-full overflow-x-auto">
          <div className="flex items-center justify-center gap-2 whitespace-nowrap py-2 px-1">
            {tabs.map((t) => (
              <Button
                key={t}
                variant={active === t ? 'default' : 'outline'}
                className={`h-9 rounded-full shadow-sm px-4 shrink-0 ${active === t ? 'ring-1 ring-border' : 'bg-background hover:bg-muted'} hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
                onClick={() => setActive(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {active === "Vue d'ensemble" && (
        <div className="space-y-6">
          {data.objectifs.length > 0 && (
          <Card className="rounded-2xl shadow-sm border border-border/60 transition-shadow duration-300 hover:shadow-lg focus-within:shadow-lg transform hover:-translate-y-0.5 focus-within:-translate-y-0.5 hover:ring-2 focus-within:ring-2 ring-border/40">
            <CardHeader>
                <CardTitle>Objectifs de la Recherche</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                  {data.objectifs.map((objectif) => (
                    <li key={objectif.id} className="flex items-start gap-2 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <span>{objectif.objectif}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          )}

          {data.methodologies.length > 0 && (
            <Card className="rounded-2xl shadow-sm border border-border/60 transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
                <CardTitle>Méthodologies Utilisées</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {data.methodologies.map((methodologie) => (
                    <div key={methodologie.id} className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-semibold text-lg">{methodologie.titre}</h4>
                      <p className="text-muted-foreground mt-1">{methodologie.description}</p>
                      {methodologie.etapes && (
                        <div className="mt-2">
                          <h5 className="font-medium text-sm">Étapes :</h5>
                          <p className="text-sm text-muted-foreground">{methodologie.etapes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
          )}
        </div>
      )}

      {active === 'Journal' && (
        <div className="space-y-6">
          {data.journal_entries.length > 0 ? (
            data.journal_entries.map((entry) => (
              <Card key={entry.id} className="rounded-2xl shadow-sm border border-border/60 transition-shadow duration-300 hover:shadow-lg focus-within:shadow-lg transform hover:-translate-y-0.5 focus-within:-translate-y-0.5 hover:ring-2 focus-within:ring-2 ring-border/40">
              <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{entry.titre}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date(entry.date_activite).toLocaleDateString('fr-FR')}</div>
                    {entry.heure_debut && (
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {entry.heure_debut}</div>
                    )}
                    <div className="flex items-center gap-2"><User className="h-4 w-4" /> {entry.auteur}</div>
                </div>
                <div className="rounded-xl bg-muted/40 p-3">
                  <div className="font-semibold mb-1">Détails:</div>
                    <p className="text-muted-foreground">{entry.details}</p>
                </div>
                  {entry.observations && (
                <div className="rounded-xl bg-muted/40 p-3">
                  <div className="font-semibold mb-1">Observations:</div>
                      <p className="text-muted-foreground">{entry.observations}</p>
                </div>
                  )}
                  {entry.equipement_utilise && (
                <div className="flex items-center gap-2">
                  <div className="font-semibold mb-1">Équipement utilisé:</div>
                      <Badge variant="secondary" className="rounded-full">{entry.equipement_utilise}</Badge>
                    </div>
                  )}
                  {entry.lieu && (
                    <div className="flex items-center gap-2">
                      <div className="font-semibold mb-1">Lieu:</div>
                      <span className="text-muted-foreground">{entry.lieu}</span>
                    </div>
                  )}
                  {entry.conditions_meteo && (
                    <div className="flex items-center gap-2">
                      <div className="font-semibold mb-1">Conditions météo:</div>
                      <span className="text-muted-foreground">{entry.conditions_meteo}</span>
                </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="rounded-2xl shadow-sm border border-border/60">
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune entrée de journal</h3>
                <p className="text-muted-foreground">Aucune activité n'a été enregistrée pour ce résultat de recherche.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {active === 'Résultats' && (
        <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          {data.resultats.length > 0 ? (
            <>
              {/* Galerie d'images des résultats */}
              {data.resultats.some(r => r.image_resultat_url) && (
                <Card className="rounded-3xl shadow-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/10">
                        <Eye className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Galerie des résultats</CardTitle>
                        <p className="text-muted-foreground mt-1">Visualisez les images des résultats de recherche</p>
                      </div>
                    </div>
            </CardHeader>
            <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {data.resultats
                        .filter(r => r.image_resultat_url)
                        .map((resultat, index) => (
                          <div 
                            key={resultat.id} 
                            className="relative group cursor-pointer"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="relative overflow-hidden rounded-2xl shadow-lg border border-border/20 bg-card">
                              <img 
                                src={resultat.image_resultat_url} 
                                alt={resultat.titre}
                                className="w-full h-56 object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                              <div className="absolute inset-0 flex items-end p-4">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                  <h4 className="font-bold text-white text-lg mb-2 drop-shadow-lg">{resultat.titre}</h4>
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className="bg-white/90 hover:bg-white text-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                    onClick={() => window.open(resultat.image_resultat_url, '_blank')}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Voir en grand
                                  </Button>
                                </div>
                              </div>
                              <div className="absolute top-3 right-3">
                                <Badge variant="secondary" className="bg-white/90 text-foreground shadow-md">
                                  {resultat.type_resultat}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
            </CardContent>
          </Card>
              )}

              {/* Détails des résultats */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Détails des résultats</h3>
                    <p className="text-muted-foreground">Informations complètes sur chaque résultat</p>
                  </div>
                </div>
                
                {data.resultats.map((resultat, index) => (
                  <Card 
                    key={resultat.id} 
                    className="group rounded-3xl shadow-lg border border-border/40 bg-gradient-to-br from-card to-muted/10 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-1.5 rounded-lg bg-primary/10">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            </div>
                            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                              {resultat.titre}
                            </CardTitle>
                          </div>
                          <Badge 
                            variant="outline" 
                            className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-all duration-300"
                          >
                            {resultat.type_resultat}
                          </Badge>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div>Ordre: {resultat.ordre}</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="prose prose-sm max-w-none">
                        <p className="text-muted-foreground leading-relaxed">{resultat.description}</p>
                      </div>
                      
                      {resultat.valeur_numerique && (
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 p-6 border border-emerald-200/50">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-emerald-500/10">
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                                {resultat.valeur_numerique}
                                {resultat.unite_mesure && (
                                  <span className="text-lg text-emerald-600 dark:text-emerald-500 ml-2 font-normal">
                                    {resultat.unite_mesure}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-emerald-600 dark:text-emerald-500 font-medium">Valeur numérique</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {resultat.fichier_resultat_url && (
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-all duration-300">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Eye className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Fichier de résultat disponible</p>
                            <p className="text-sm text-muted-foreground">Cliquez pour télécharger</p>
                          </div>
                          <a 
                            href={resultat.fichier_resultat_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 font-medium"
                          >
                            Télécharger
                          </a>
                        </div>
                      )}
                      
                      {resultat.image_resultat_url && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Image du résultat</span>
                          </div>
                          <div className="relative group overflow-hidden rounded-2xl shadow-lg border border-border/20">
                            <img 
                              src={resultat.image_resultat_url} 
                              alt={resultat.titre}
                              className="w-full h-auto max-h-96 object-cover transition-all duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button
                                size="lg"
                                variant="secondary"
                                className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white/90 hover:bg-white text-foreground shadow-xl hover:shadow-2xl hover:scale-110"
                                onClick={() => window.open(resultat.image_resultat_url, '_blank')}
                              >
                                <Eye className="h-5 w-5 mr-2" />
                                Voir en grand
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="rounded-3xl shadow-lg border border-border/40 bg-gradient-to-br from-card to-muted/10 backdrop-blur-sm">
              <CardContent className="text-center py-16">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
                  <div className="relative p-6 rounded-full bg-primary/10 mx-auto w-fit">
                    <Eye className="h-16 w-16 text-primary/60" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Aucun résultat disponible</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                  Aucun résultat n'a été enregistré pour cette recherche. Les résultats apparaîtront ici une fois ajoutés.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button 
                    variant="outline" 
                    className="px-6 py-3 rounded-xl hover:bg-primary/5 transition-all duration-300"
                    onClick={() => navigate(-1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour aux résultats
                  </Button>
              </div>
            </CardContent>
          </Card>
          )}
        </div>
      )}

      {active === 'Matériel' && (
        <div className="space-y-6">
          {data.materiel.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.materiel.map((materiel) => (
                <Card key={materiel.id} className="rounded-2xl shadow-sm border border-border/60 transition-shadow duration-200 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{materiel.nom}</CardTitle>
                      <Badge variant="outline" className="text-xs">{materiel.type_materiel}</Badge>
                    </div>
            </CardHeader>
            <CardContent className="space-y-3">
                    {materiel.reference && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Réf:</span> {materiel.reference}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Quantité:</span>
                      <Badge className="rounded-full">
                        {materiel.quantite} {materiel.unite}
                      </Badge>
                  </div>
                    
                    {materiel.description && (
                      <p className="text-sm text-muted-foreground">{materiel.description}</p>
                    )}
                    
                    {materiel.fournisseur && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Fournisseur:</span> {materiel.fournisseur}
                </div>
                    )}
                    
                    {materiel.cout_unitaire && (
                      <div className="text-sm font-medium text-emerald-600">
                        Coût: {materiel.cout_unitaire.toLocaleString()} FCFA
                      </div>
                    )}
            </CardContent>
          </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-2xl shadow-sm border border-border/60">
              <CardContent className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun matériel enregistré</h3>
                <p className="text-muted-foreground">Aucun matériel n'a été enregistré pour cette recherche.</p>
            </CardContent>
          </Card>
          )}
        </div>
      )}

      {active === 'Équipe' && (
        <div className="space-y-6">
          {data.equipe.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.equipe.map((membre) => (
                <Card key={membre.id} className="rounded-2xl shadow-sm border border-border/60 transition-shadow duration-200 hover:shadow-md">
                  <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                        <AvatarImage src={membre.photo_chercheur || ""} alt={membre.nom_complet || ""} />
                        <AvatarFallback>
                          {membre.nom_complet 
                            ? membre.nom_complet.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
                            : '??'
                          }
                        </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                        <div className="font-semibold text-lg">
                          {membre.nom_complet || `${membre.prenom_chercheur || ''} ${membre.nom_chercheur || ''}`.trim() || 'Nom non disponible'}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {membre.role_equipe}
                  </div>
                        {membre.id_chercheur && (
                          <Button 
                            variant="link" 
                            className="px-0 h-auto underline-offset-4 hover:underline text-sm"
                            onClick={() => navigate(`/team/${membre.id_chercheur}`)}
                          >
                            Voir le profil complet
                          </Button>
                        )}
                </div>
              </div>
            </CardContent>
          </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-2xl shadow-sm border border-border/60">
              <CardContent className="text-center py-8">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun membre d'équipe</h3>
                <p className="text-muted-foreground">Aucun membre d'équipe n'a été enregistré pour cette recherche.</p>
            </CardContent>
          </Card>
          )}
        </div>
      )}

      {active === 'Méthodologie' && (
        <div className="space-y-6">
          {data.methodologies.length > 0 ? (
            data.methodologies.map((methodologie) => (
              <Card key={methodologie.id} className="rounded-2xl shadow-sm border border-border/60 transition-shadow duration-200 hover:shadow-md">
          <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{methodologie.titre}</CardTitle>
                    <Badge variant="outline">{methodologie.type_methode}</Badge>
                  </div>
          </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{methodologie.description}</p>
                  
                  {methodologie.etapes && (
                    <div>
                      <h4 className="font-semibold mb-2">Étapes détaillées :</h4>
                      <div className="bg-muted/40 rounded-lg p-4">
                        <p className="text-sm whitespace-pre-line">{methodologie.etapes}</p>
                      </div>
                    </div>
                  )}
                  
                  {methodologie.criteres_evaluation && (
                    <div>
                      <h4 className="font-semibold mb-2">Critères d'évaluation :</h4>
                      <div className="bg-muted/40 rounded-lg p-4">
                        <p className="text-sm whitespace-pre-line">{methodologie.criteres_evaluation}</p>
                      </div>
                    </div>
                  )}
                  
                  {methodologie.limitations && (
                    <div>
                      <h4 className="font-semibold mb-2">Limitations :</h4>
                      <div className="bg-muted/40 rounded-lg p-4">
                        <p className="text-sm whitespace-pre-line">{methodologie.limitations}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="rounded-2xl shadow-sm border border-border/60">
              <CardContent className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune méthodologie enregistrée</h3>
                <p className="text-muted-foreground">Aucune méthodologie n'a été enregistrée pour cette recherche.</p>
          </CardContent>
        </Card>
          )}
        </div>
      )}

      
    </div>
  );
};

export default DetailResultatRecherche;