import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Linkedin, GraduationCap, Search, ExternalLink, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, AlertCircle, Globe, Github, Instagram, Twitter, Facebook, Phone, Youtube } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PageSlider from "./PageSlider";
import PageHero from "./PageHero";
import NoResults from "./NoResults";
import { Constants } from "@/constants/Constants";
import { useChercheurs, transformChercheurToTeamMember } from "@/hooks/useChercheurs";

const Team = () => {

  const { chercheurs, loading, error, refetch } = useChercheurs(Constants.idLaboratoire);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Transformation des données API vers le format attendu par le frontend
  const teamMembers = chercheurs.map(transformChercheurToTeamMember);

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Regroupement par poste
  const membersByRole = filteredMembers.reduce((acc, member) => {
    const role = member.role || 'Autres';
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(member);
    return acc;
  }, {} as Record<string, typeof teamMembers>);

  // Calcul des spécialités uniques
  const uniqueSpecializations = [...new Set(teamMembers
    .map(member => member.specialization)
    .filter(spec => spec && spec !== 'Recherche Générale')
  )];

  // Calcul des chercheurs actifs (ceux qui ont un email ou LinkedIn)
  const activeChercheurs = teamMembers.filter(member => 
    member.email || (member.linkedin && member.linkedin !== '#')
  );

  // Calcul des chercheurs avec photos
  const chercheursAvecPhoto = teamMembers.filter(member => member.photo);

  // Calcul du nombre total de réseaux sociaux configurés
  const totalReseaux = chercheurs.reduce((total, chercheur) => {
    return total + (chercheur.reseaux?.length || 0);
  }, 0);

  // Tri des postes par ordre d'importance
  const roleOrder = [
    'Directrice du Laboratoire',
    'Directeur du Laboratoire', 
    'Chef de Département',
    'Chercheuse Senior',
    'Chercheur Senior',
    'Chercheur',
    'Chercheuse',
    'Post-Doctorante',
    'Post-Doctorant',
    'Autres'
  ];

  const sortedRoles = Object.keys(membersByRole).sort((a, b) => {
    const indexA = roleOrder.indexOf(a);
    const indexB = roleOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Calcul du total des membres filtrés
  const totalFilteredMembers = filteredMembers.length;

  // Pagination calculations
  const totalPages = Math.ceil(totalFilteredMembers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Application de la pagination sur les membres filtrés (tous postes confondus)
  const currentMembers = filteredMembers.slice(startIndex, endIndex);
  
  // Regroupement des membres de la page actuelle par poste
  const currentMembersByRole = currentMembers.reduce((acc, member) => {
    const role = member.role || 'Autres';
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(member);
    return acc;
  }, {} as Record<string, typeof teamMembers>);

  // Reset to first page when search term changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    
    // Recherche côté serveur avec debounce
    if (value.trim()) {
      const timeoutId = setTimeout(() => {
        refetch(value);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      refetch();
    }
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById('TeamBlockAll')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(Math.max(1, currentPage - 1));
  const goToNextPage = () => goToPage(Math.min(totalPages, currentPage + 1));

  // Items per page handler
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    
    const regex = new RegExp(`(${search.trim()})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-primary/20 text-primary font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Fonction pour obtenir l'icône du réseau social
  const getNetworkIcon = (typeReseau: string) => {
    const iconProps = { className: "h-4 w-4" };
    
    switch (typeReseau.toLowerCase()) {
      case 'email':
        return <Mail {...iconProps} />;
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      case 'github':
        return <Github {...iconProps} />;
      case 'twitter':
        return <Twitter {...iconProps} />;
      case 'facebook':
        return <Facebook {...iconProps} />;
      case 'instagram':
        return <Instagram {...iconProps} />;
      case 'youtube':
        return <Youtube {...iconProps} />;
      case 'téléphone':
      case 'telephone':
        return <Phone {...iconProps} />;
      case 'siteweb':
      case 'site web':
        return <Globe {...iconProps} />;
      default:
        return <Globe {...iconProps} />;
    }
  };

  // Fonction pour gérer le clic sur un réseau
  const handleNetworkClick = (typeReseau: string, contact: string) => {
    switch (typeReseau.toLowerCase()) {
      case 'email':
        window.open(`mailto:${contact}`, '_blank');
        break;
      case 'téléphone':
      case 'telephone':
        window.open(`tel:${contact}`, '_blank');
        break;
      case 'linkedin':
      case 'github':
      case 'twitter':
      case 'facebook':
      case 'instagram':
      case 'youtube':
      case 'siteweb':
      case 'site web':
        // Ajouter https:// si l'URL ne commence pas par http
        const url = contact.startsWith('http') ? contact : `https://${contact}`;
        window.open(url, '_blank');
        break;
      default:
        if (contact.includes('@')) {
          window.open(`mailto:${contact}`, '_blank');
        } else {
          const url = contact.startsWith('http') ? contact : `https://${contact}`;
          window.open(url, '_blank');
        }
    }
  };

  // Fonction pour obtenir les réseaux depuis les données de l'API
  const getMemberNetworks = (memberId: number) => {
    const chercheur = chercheurs.find(c => c.id === memberId);
    return chercheur?.reseaux || [];
  };

  return (
    <section 
      id="team" 
      className="pt-20" 
      style={{
        ...Constants.pdTopCardApresNav,
        ...Constants.bgPrincipal,
      }}
      >
      <div className="relative z-10">
        <div 
          className={Constants.classApresNavbar}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05)), url(https://images.unsplash.com/photo-1559136555-9303baea8ebd)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm" />
          <div className="relative z-10 mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 drop-shadow-sm">
              Notre Équipe de Recherche
            </h2>
            <p className="text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed drop-shadow">
              Une équipe pluridisciplinaire de chercheurs passionnés, unis par la quête d'excellence 
              scientifique et l'innovation technologique.
            </p>
          </div>
          
          {/* Search Input */}
          <div>
            <div className={searchTerm === '' ? "relative max-w-md mx-auto" :  "relative mx-auto " } >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un membre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 text-foreground placeholder:text-foreground/60 border border-border/50"
              />
            </div>

              {searchTerm.length > 0 ? 
                <div className="relative z-10 mb-8 flex gap-10 mt-2">
                  <p className="text-foreground/90">{filteredMembers.length} {filteredMembers.length <= 1 ? "element trouvé" : "elements trouvés"} </p>
                  <a className="text-sm text-primary font-medium transition-all duration-300 transform hover:scale-105" href="#TeamBlockAll">Voir le resultat</a>
                </div> : null
              }
          </div>


          <PageHero 
            stats={[
              { value: chercheurs.length.toString(), label: "Total Chercheurs" },
              { value: uniqueSpecializations.length.toString(), label: "Spécialités" },
              { value: totalReseaux.toString(), label: "Réseaux Sociaux" }
            ]}
          />
        </div>

        {/* Gestion des erreurs */}
        {error && (
          <div className={Constants.ClassPdXgrandBlock}>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Erreur lors du chargement des données: {error}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2" 
                  onClick={() => refetch()}
                >
                  Réessayer
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* État de chargement */}
        {loading && (  
          <div className={"flex justify-center items-center py-20 " + Constants.ClassPdXgrandBlock}>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="text-lg">Chargement des chercheurs...</span>
            </div>
          </div>
        )}

        <div 
          id="TeamBlockAll"
          className={Constants.ClassPdXgrandBlock}
          style={Constants.bgWhite}
        > 
          {!loading && currentMembers.length > 0 ? (
            <div className="space-y-12">
              {/* Affichage groupé par poste */}
              {sortedRoles.map(role => {
                const roleMembers = currentMembersByRole[role];
                if (!roleMembers || roleMembers.length === 0) return null;
                
                return (
                  <div key={role} className="space-y-6">
                    {/* Titre de la section par poste */}
                    <div className="text-center">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        {role}
                      </h3>
                      <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
                      <p className="text-foreground/80 mt-3">
                        {roleMembers.length} {roleMembers.length === 1 ? 'membre' : 'membres'}
                      </p>
                    </div>
                    
                    {/* Grille des membres pour ce poste */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {roleMembers.map((member) => (
                        <Card key={member.id} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/80 hover:-translate-y-2 group relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <CardContent className="p-8 relative z-10">
                            <div className="text-center mb-6">
                              <div className="relative mx-auto mb-6">
                                {/* Affichage de la photo ou initiales */}
                                {member.photo ? (
                                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                    <img 
                                      src={member.photo} 
                                      alt={member.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        // En cas d'erreur de chargement, afficher les initiales
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent) {
                                          parent.innerHTML = `
                                            <div class="w-full h-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center text-white text-2xl font-bold">
                                              ${member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                          `;
                                        }
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                )}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg opacity-80" />
                              </div>
                              <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                                {highlightText(member.name, searchTerm)}
                              </h4>
                              <p className="text-primary font-semibold mb-3">{highlightText(member.role, searchTerm)}</p>
                              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-soft to-primary/10 rounded-full px-4 py-2 shadow-sm">
                                <GraduationCap className="h-4 w-4 text-primary" />
                                <span className="text-sm text-primary font-medium">{highlightText(member.specialization, searchTerm)}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <p className="text-foreground/80 text-sm leading-relaxed line-clamp-3">
                                {member.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 justify-center pt-2">
                                {getMemberNetworks(member.id).map((reseau, index) => (
                                  <Button 
                                    key={index}
                                    variant="ghost" 
                                    size="sm" 
                                    className="hover:text-primary hover:bg-primary/10 rounded-full h-10 w-10 p-0 transition-all duration-300 hover:scale-110"
                                    onClick={() => handleNetworkClick(reseau.type_reseau, reseau.contact)}
                                    title={`${reseau.type_reseau}: ${reseau.contact}`}
                                  >
                                    {getNetworkIcon(reseau.type_reseau)}
                                  </Button>
                                ))}
                                {/* Fallback si aucun réseau n'est configuré */}
                                {getMemberNetworks(member.id).length === 0 && (
                                  <span className="text-xs text-muted-foreground italic">
                                    Aucun réseau configuré
                                  </span>
                                )}
                              </div>
                              
                              {/* Lien vers la page détail du membre */}
                              <div className="pt-2">
                                <Button 
                                  variant="default" 
                                  size="sm" 
                                  className="w-full transition-all duration-300"
                                  onClick={() => window.location.href = `/team/${member.id}`}
                                >
                                  Voir le Profil
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : !loading && (
            <NoResults 
              type="team" 
              searchTerm={searchTerm}
              onClearSearch={() => {
                setSearchTerm("");
                refetch();
              }}
            />
          )}
        </div>

        {/* Pagination Controls */}
        {!loading && totalFilteredMembers > 0 && totalPages > 1 && (
          <div className={"flex flex-col sm:flex-row justify-between items-center gap-6 " + Constants.ClassPdXgrandBlock}>
            {/* Items per page selector and info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Afficher:</span>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">par page</span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Affichage de {startIndex + 1} à {Math.min(endIndex, totalFilteredMembers)} sur {totalFilteredMembers} résultats
              </div>
            </div>
            
            {/* Pagination buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(pageNumber)}
                      className="h-9 w-9 p-0"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="h-9 w-9 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className="h-9 w-9 p-0"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <div className={"relative overflow-hidden " + Constants.ClassPdXgrandBlock}>
          <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-12 shadow-xl border border-primary/20 group hover:shadow-2xl transition-all duration-500">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ExternalLink className="h-8 w-8 text-white" />
              </div>
              
              {/* Title */}
              <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-6">
                Rejoignez Notre Équipe d'Excellence
              </h3>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Nous recrutons régulièrement des chercheurs talentueux et passionnés. 
                Découvrez nos opportunités de carrière exceptionnelles et rejoignez une équipe 
                innovante qui façonne l'avenir de la recherche scientifique.
              </p>
              
              {/* Features grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center gap-3 p-4 bg-white/50 rounded-xl border border-primary/10">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-foreground">Environnement Stimulant</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-white/50 rounded-xl border border-primary/10">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-foreground">Projets Innovants</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-white/50 rounded-xl border border-primary/10">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-foreground">Équipe Internationale</span>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-3 text-lg font-semibold"
                  onClick={() => window.open('mailto:recrutement@labvoyage.fr?subject=Candidature spontanée', '_blank')}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Voir les Offres d'Emploi
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 px-8 py-3 text-lg"
                  onClick={() => window.location.href = '/contact'}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Nous Contacter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    </section>
  );
};

export default Team;