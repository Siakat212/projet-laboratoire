import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Linkedin, GraduationCap, FileText, Users, Award, ExternalLink, Loader2, Github, Twitter, Facebook, Instagram, Youtube, Phone, Globe, BookOpen, Calendar } from "lucide-react";
import { Constants } from "@/constants/Constants";
import { useChercheurDetail } from "@/hooks/useChercheurs";
import { ChercheurDetailAPI } from "@/config/ApiConfig";

const TeamMemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const memberId = parseInt(id || '0');
  
  const { chercheur: member, loading, error } = useChercheurDetail(memberId);

  // Fonction pour obtenir l'icône du réseau
  const getNetworkIcon = (typeReseau: string) => {
    const iconProps = { className: "h-4 w-4" };
    switch (typeReseau.toLowerCase()) {
      case 'email': return <Mail {...iconProps} />;
      case 'linkedin': return <Linkedin {...iconProps} />;
      case 'github': return <Github {...iconProps} />;
      case 'twitter': return <Twitter {...iconProps} />;
      case 'facebook': return <Facebook {...iconProps} />;
      case 'instagram': return <Instagram {...iconProps} />;
      case 'youtube': return <Youtube {...iconProps} />;
      case 'téléphone': return <Phone {...iconProps} />;
      case 'siteweb': return <Globe {...iconProps} />;
      case 'researchgate': return <BookOpen {...iconProps} />;
      case 'googlescholar': return <GraduationCap {...iconProps} />;
      case 'orcid': return <Award {...iconProps} />;
      default: return <Globe {...iconProps} />;
    }
  };

  // Fonction pour gérer les clics sur les réseaux
  const handleNetworkClick = (typeReseau: string, contact: string) => {
    switch (typeReseau.toLowerCase()) {
      case 'email':
        window.open(`mailto:${contact}`, '_blank');
        break;
      case 'téléphone':
        window.open(`tel:${contact}`, '_blank');
        break;
      default:
        const url = contact.startsWith('http') ? contact : `https://${contact}`;
        window.open(url, '_blank');
    }
  };

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={Constants.bgWhite}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-foreground/80">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error || !member) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={Constants.bgWhite}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Membre non trouvé</h1>
          <p className="text-foreground/80 mb-4">{error || 'Ce membre n\'existe pas.'}</p>
          <Button onClick={() => navigate('/team')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'équipe
          </Button>
        </div>
      </div>
    );
  }

  // Formatage des données
  const fullName = `${member.prenom || ''} ${member.nom || ''}`.trim();
  const primaryRole = member.postes?.[0]?.poste?.nom || 'Chercheur';
  const primarySpecialization = member.domaines_expertise?.[0]?.domaine?.titre || 'Recherche générale';
  const emailContact = member.reseaux?.find(r => r.type_reseau === 'Email')?.contact || '';
  const linkedinContact = member.reseaux?.find(r => r.type_reseau === 'LinkedIn')?.contact || '';

  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <div className={Constants.ClassPdXgrandBlock + " pt-8"}>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/team')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'équipe
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* En-tête du profil */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 bg-gradient-to-br from-white via-gray-50/95 to-primary/8 dark:from-gray-900 dark:via-gray-800/95 dark:to-primary/15 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/25 to-transparent rounded-bl-[120px] opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/15 to-transparent rounded-tr-[80px] opacity-50"></div>
              <CardContent className="p-10 relative z-10">
                <div className="flex items-start gap-8 mb-8">
                  <div className="relative group">
                    {member.photo_url ? (
                      <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:rotate-3 border-4 border-white dark:border-gray-700">
                        <img 
                          src={member.photo_url} 
                          alt={fullName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="w-32 h-32 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl hidden">
                          <span className="relative z-10">{fullName.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:rotate-3 border-4 border-white dark:border-gray-700">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/40 to-transparent animate-pulse"></div>
                        <span className="relative z-10">{fullName.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    )}
                    <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-primary/30 via-transparent to-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">{fullName}</h1>
                    <p className="text-2xl text-primary font-bold mb-5">{primaryRole}</p>
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-accent/15 rounded-2xl px-6 py-3 border border-primary/30 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105">
                      <GraduationCap className="h-6 w-6 text-primary" />
                      <span className="text-base text-primary font-bold">{primarySpecialization}</span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/85 leading-relaxed text-lg font-medium">{member.biographie || 'Profil en cours de mise à jour...'}</p>
              </CardContent>
            </Card>

            {/* Domaines d'expertise */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card/95 to-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Domaines d'Expertise</h2>
                </div>
                <div className="space-y-4">
                  {member.domaines_expertise && member.domaines_expertise.length > 0 ? (
                    member.domaines_expertise.map((domaine, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <span className="text-foreground font-medium leading-relaxed block">{domaine.domaine.titre}</span>
                          {domaine.domaine.description && (
                            <span className="text-muted-foreground text-sm leading-relaxed">{domaine.domaine.description}</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-foreground/80 leading-relaxed">Domaines d'expertise en cours de mise à jour...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recherches actuelles */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card/95 to-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Recherches Actuelles</h2>
                </div>
                <div className="space-y-4">
                  {member.recherches_actuelles && member.recherches_actuelles.length > 0 ? (
                    member.recherches_actuelles.map((recherche, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <span className="text-foreground font-medium leading-relaxed">{recherche.titre}</span>
                            <div className="flex gap-2">
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                recherche.statut === 'En cours' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {recherche.statut}
                              </span>
                              <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                                {recherche.role_equipe.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                          
                          {recherche.description && (
                            <p className="text-foreground/80 text-sm leading-relaxed mb-2">
                              {recherche.description}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Début: {new Date(recherche.date_debut).toLocaleDateString('fr-FR')}
                            </span>
                            {recherche.date_fin_prevue && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Fin prévue: {new Date(recherche.date_fin_prevue).toLocaleDateString('fr-FR')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-foreground/80 leading-relaxed">Aucune recherche active actuellement.</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            

            {/* Publications récentes */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 bg-gradient-to-br from-white via-gray-50/95 to-primary/8 dark:from-gray-900 dark:via-gray-800/95 dark:to-primary/15 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-[80px] opacity-60"></div>
              <CardContent className="p-10 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/25 to-primary/15 rounded-2xl flex items-center justify-center shadow-lg">
                    <FileText className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-3xl font-black text-foreground">Publications Scientifiques</h2>
                </div>
                <div className="space-y-6">
                  {member.publications && member.publications.length > 0 ? (
                    member.publications.map((publication, idx) => (
                      <div 
                        key={idx}
                        className="p-8 bg-gradient-to-r from-accent/15 via-accent/8 to-transparent rounded-2xl hover:from-accent/25 hover:via-accent/15 hover:to-accent/8 transition-all duration-500 cursor-pointer group border border-border/40 hover:border-primary/30 shadow-lg hover:shadow-xl hover:-translate-y-1"
                        onClick={() => {
                          if ((publication as any).id) {
                            window.location.href = `/publications/${(publication as any).id}`;
                            return;
                          }
                          if ((publication as any).url_publication) {
                            window.open((publication as any).url_publication, '_blank');
                            return;
                          }
                          if ((publication as any).fichier_url) {
                            window.open((publication as any).fichier_url, '_blank');
                            return;
                          }
                          if ((publication as any).doi) {
                            window.open(`https://doi.org/${(publication as any).doi}`, '_blank');
                          }
                        }}
                      >
                        <div className="space-y-4">
                          <h3 className="text-foreground font-bold group-hover:text-primary transition-colors duration-300 leading-relaxed text-xl">
                            {publication.titre}
                          </h3>
                          
                          {publication.resume && (
                            <p className="text-foreground/85 text-base leading-relaxed line-clamp-3 font-medium">
                              {publication.resume}
                            </p>
                          )}
                          
                          <div className="flex flex-wrap gap-3 items-center text-xs text-muted-foreground">
                            {publication.recherche_titre && (
                              <span className="bg-primary/10 px-2 py-1 rounded-full text-primary font-medium">
                                {publication.recherche_titre}
                              </span>
                            )}
                            
                            {publication.date_publication && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(publication.date_publication).getFullYear()}
                              </span>
                            )}
                            
                            {publication.facteur_impact && (
                              <span className="flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                Impact: {publication.facteur_impact}
                              </span>
                            )}
                            
                            {publication.doi && (
                              <span className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" />
                                DOI
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent rounded-xl border border-border/30">
                      <p className="text-foreground/80 leading-relaxed">
                        Aucune publication disponible pour {fullName}. Les travaux de recherche et publications académiques seront affichés ici une fois disponibles.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Barre latérale */}
          <div className="space-y-6">
            {/* Contact */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-primary/5 hover:shadow-xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <h3 className="font-bold text-foreground">Contact</h3>
                </div>
                <div className="space-y-3">
                  {member.reseaux && member.reseaux.length > 0 ? (
                    member.reseaux.map((reseau, idx) => (
                      <Button 
                        key={idx}
                        variant="outline" 
                        className="w-full justify-start bg-gradient-to-r from-background to-primary/5 border-primary/20 hover:border-primary/40 hover:bg-primary hover:text-white transition-all duration-300"
                        onClick={() => handleNetworkClick(reseau.type_reseau, reseau.contact)}
                        title={`${reseau.type_reseau}: ${reseau.contact}`}
                      >
                        {getNetworkIcon(reseau.type_reseau)}
                        <span className="ml-2 flex-1 text-left">{reseau.type_reseau}</span>
                        <ExternalLink className="ml-auto h-3 w-3" />
                      </Button>
                    ))
                  ) : (
                    <div className="text-center p-4 text-muted-foreground">
                      <p>Aucun contact disponible</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Formation */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-primary/5 hover:shadow-xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-foreground">Formation</h3>
                </div>
                <div className="space-y-3">
                  {member.diplomes && member.diplomes.length > 0 ? (
                    member.diplomes.map((diplome, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-sm text-foreground leading-relaxed">
                          <div className="font-medium text-foreground">{diplome.diplome}</div>
                          <div>{diplome.etablissement}</div>
                          <div className="text-xs text-foreground/80 mt-1">{new Date(diplome.annee_obtention).getFullYear()}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-3 p-3 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-foreground/80 leading-relaxed">Formation en cours de mise à jour...</span>
                      <span className="text-sm text-muted-foreground leading-relaxed">Formation en cours de mise à jour...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Domaines d'expertise */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-primary/5 hover:shadow-xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <h3 className="font-bold text-foreground">Domaines d'expertise</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {member.domaines_expertise && member.domaines_expertise.length > 0 ? (
                    member.domaines_expertise.map((domaine, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="px-4 py-2 bg-gradient-to-r from-background to-primary/5 border-primary/20 hover:border-primary/40 hover:bg-primary hover:text-white transition-all duration-300 text-sm font-medium"
                      >
                        {domaine.domaine.titre}
                      </Badge>
                    ))
                  ) : (
                    <Badge 
                      variant="outline" 
                      className="px-4 py-2 bg-gradient-to-r from-background to-primary/5 border-primary/20 text-sm font-medium text-muted-foreground"
                    >
                      En cours de mise à jour
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetail;