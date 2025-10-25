import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, Award, BookOpen, Users, GraduationCap, Search, FileText, ExternalLink, ChevronUp , ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import DirectorDeclarations from "./DirectorDeclarations";
import { Constants } from "@/constants/Constants";
import { Button } from "@/components/ui/button";
import { usePluseMoinsTout } from "@/hooks/use-plus-moins-tout";
import { useState } from "react";


const DirectorCV = ({ director }) => {
    const [projects, setPrjects] = useState(director.projetRecherche.slice(0, 2))
    const [publicationParSaut, setPublicationParSaut] = useState(director.Publication.slice(0, 2))


    const [plusReseauch , moinsReseauch, parSautReseauch] = usePluseMoinsTout(projects, setPrjects, director.projetRecherche.length, director.projetRecherche, 2)
    const [plusPublication , moinsPublication, parSautPublication] = usePluseMoinsTout(publicationParSaut, setPublicationParSaut, director.Publication.length, director.Publication, 2)

  return (
    <div className="max-w-7xl mx-auto space-y-8" style={Constants.bgWhite}>
      {/* Header Section - CV Style */}
      <Card className="border-0 shadow-xl overflow-visible flex rounded-2xl">
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-background p-10 w-full">
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
        {/* Photo professionnelle améliorée */}
        <div className="flex-shrink-0">
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-primary/10 flex items-center justify-center shadow-2xl border-4 border-primary/30 overflow-hidden">
            {director.image ? (
              <img
                src={director.image}
                alt={director.nom}
                className="w-36 h-36 rounded-full object-cover"
              />
            ) : (
              <span className="text-white bg-primary/80 w-36 h-36 flex items-center justify-center rounded-full text-5xl font-extrabold tracking-wide">
                {director.nom
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
                {director.prenom
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>
        </div>
        
        {/* Infos personnelles améliorées */}
        <div className="flex-1 space-y-7">
          <div>
            <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">{director.titrePlusNom}</h1>
            <Badge variant="secondary" className="text-lg px-5 py-2 bg-primary/30 text-primary font-semibold shadow">
              Directeur du Laboratoire
            </Badge>
          </div>
          
          {/* Contact amélioré */}
          <div className="grid sm:grid-cols-3 gap-6 mt-4">
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
          <Mail className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">{director.mail}</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
          <Phone className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">{director.telephone}</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">{director.bureau}</span>
            </div>
          </div>
        </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne gauche */}
        <div className="lg:col-span-1 space-y-6">
          {/* Formation */}
          <Card className="border border-muted/20 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="h-5 w-5 text-primary" />
                Formation Académique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {director.chercheurDiplome.map((edu, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-primary/20">
                  <div className="absolute -left-1 top-1 w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">{edu.diplome} - {edu.etablissement} ({edu.annee_obtention.split('-')[0]})</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Expertise */}
          <Card className="border border-muted/20 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                Domaines d'Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {director.domaineExpertise.map((exp, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:from-primary/10 hover:border-primary/20 transition-all duration-200"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground">{exp.titre}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profil professionnel */}
          <Card className="border border-muted/20 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-6 w-6 text-primary" />
                Profil Professionnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-justify">
                {director.profil}
              </p>
            </CardContent>
          </Card>

          {/* Recherches Complètes */}
          <Card className="border border-muted/20 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xl">
                  <Search className="h-6 w-6 text-primary" />
                  Projets de Recherche
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {projects.map((research, index) => (
                <Link
                  key={index}
                  to={`/research/${research.id}`}
                  className="block border-l-4 border-primary/50 pl-8 relative bg-gradient-to-r from-primary/5 to-transparent hover:bg-primary/10 rounded-xl p-5 transition-all shadow-sm group"
                >
                  <div className="absolute -left-3 top-6 w-5 h-5 bg-primary/70 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></div>
                  <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {research.id_recherche.titre}
                    </h3>
                    <Badge variant="secondary" className="text-xs px-3 py-1 bg-primary/20 text-primary">
                    {research.id_recherche.date_debut.split('-')[0]} - {research.id_recherche.date_fin_reelle ? research.id_recherche.date_fin_reelle.split('-')[0] : research.id_recherche.date_fin_prevue.split('-')[0]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    <span
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        maxHeight: '3em', // Approx. 2 lines
                      }}
                    >
                      {research.id_recherche.description}
                    </span>
                  </p>

                  <p className="text-sm text-muted-foreground font-bold">Partenaires : </p>
                  {research.partenaire.map((partenaire, index) => (
                    <Badge key={index} className="bg-primary/10 text-primary font-medium px-2 py-1 rounded">
                      <div>
                        {partenaire.nomPartenaire} - {partenaire.type_collaboration}
                      </div>
                    </Badge>

                  ))}
                  </div>
                </Link>
              ))}

              {director.projetRecherche.length === parSautReseauch ? null : 
                <div className="text-center mt-10">
                  <Button
                    disabled = {director.projetRecherche.length > projects.length ? false : true }
                    onClick={plusReseauch}
                    variant="outline"
                    className="px-8 py-2"
                  >
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Voir tout
                  </Button>
    
                  <Button 
                    disabled = {parSautReseauch < projects.length ? false : true }
                    onClick={moinsReseauch}
                    variant="outline"
                    className="px-8 py-2 ml-10"
                  >
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Reduire
                  </Button>
                </div>
              }
            </CardContent>
          </Card>

          {/* Publications Complètes */}
          <Card className="border border-muted/20 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xl">
                  <FileText className="h-6 w-6 text-primary" />
                  Publications Scientifiques
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {publicationParSaut.map((pub, index) => (
                <Link
                  key={index}
                  to={`/publications/${pub.id}`}
                  className="block p-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/10 via-background to-background hover:shadow-xl hover:bg-primary/20 transition-all group"
                >
                  <div className="flex flex-col gap-1 mb-3">
                    <h4 className="font-bold text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
                      {pub.titre}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      <span
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'normal',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          display: '-webkit-box',
                          maxHeight: '3em', // Approx. 2 lines
                        }}
                      >
                        {pub.resume}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <Badge variant="outline" className="text-xs px-3 py-1 bg-green-50 border-green-200 text-green-700 font-semibold shadow-sm">
                      {pub.nombreMotCle ? parseInt(pub.nombreMotCle) > 1 ? `${pub.nombreMotCle} mots-clés` : `${pub.nombreMotCle} mot-clé` : ' 0 mot-clé'}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-3 py-1 bg-blue-50 border-blue-200 text-blue-700 font-semibold shadow-sm">
                      {pub.nombrecitation ? parseInt(pub.nombrecitation) > 1 ? `${pub.nombrecitation} citations` : `${pub.nombrecitation} citation` : '0 citation'}
                    </Badge>
                  </div>
                </Link>
              ))}

              {director.Publication.length === parSautPublication ? null : 
                <div className="text-center mt-10">
                  <Button
                    disabled = {director.Publication.length > publicationParSaut.length ? false : true }
                    onClick={plusPublication}
                    variant="outline"
                    className="px-8 py-2"
                  >
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Voir tout
                  </Button>
    
                  <Button 
                    disabled = {parSautPublication < publicationParSaut.length ? false : true }
                    onClick={moinsPublication}
                    variant="outline"
                    className="px-8 py-2 ml-10"
                  >
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Reduire
                  </Button>
                </div>
              }

            </CardContent>
          </Card>
        </div>
      </div>

      {/* Déclarations et Communications */}
      <DirectorDeclarations declarations={director.motDirecteur} />

    </div>
  );
};

export default DirectorCV;