import {
  Microscope,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { contactApiService } from "@/services/contactApi";
import { ContactLaboratoireList, HoraireLaboratoire } from "@/types/contact";
import { Constants } from "@/constants/Constants";
import { useFetch } from "@/hooks/use-fetch";

const Footer = () => {
  const [contacts, setContacts] = useState<ContactLaboratoireList[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const response = await contactApiService.getContacts({
          laboratoire_id: Constants.idLaboratoire,
        });
        // Réponses paginées standard DRF
        if (response && Array.isArray((response as any).results)) {
          const activeContacts = (response as any).results.filter(
            (c: ContactLaboratoireList) => c.est_actif
          );
          setContacts(activeContacts);
        } else if (Array.isArray(response as any)) {
          const activeContacts = (response as any).filter(
            (c: ContactLaboratoireList) => c.est_actif
          );
          setContacts(activeContacts);
        } else {
          // Format inattendu -> considérer comme vide
          setContacts([]);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des contacts";
        console.error("Erreur lors du chargement des contacts:", err);
        setContacts([]);
      }
    };
    loadContacts();
  }, [Constants.idLaboratoire]);

  const [horaires, setHoraires] = useState<
    Record<number, HoraireLaboratoire[]>
  >({});
  const [loadingHoraires, setLoadingHoraires] = useState(false);

  // Charger les horaires pour les contacts principaux
  useEffect(() => {
    const loadHoraires = async () => {
      if (contacts.length === 0) return;

      setLoadingHoraires(true);
      try {
        const horairePromises = contacts
          .filter((contact) => contact.type_contact === "principal")
          .map(async (contact) => {
            try {
              const contactHoraires =
                await contactApiService.getContactHoraires(contact.id);
              return { contactId: contact.id, horaires: contactHoraires };
            } catch (error) {
              console.error(
                `Erreur lors du chargement des horaires pour le contact ${contact.id}:`,
                error
              );
              return { contactId: contact.id, horaires: [] };
            }
          });

        const results = await Promise.all(horairePromises);
        const horaireMap = results.reduce((acc, { contactId, horaires }) => {
          acc[contactId] = horaires;
          return acc;
        }, {} as Record<number, HoraireLaboratoire[]>);

        setHoraires(horaireMap);
      } catch (error) {
        console.error("Erreur lors du chargement des horaires:", error);
      } finally {
        setLoadingHoraires(false);
      }
    };

    loadHoraires();
  }, [contacts]);

  const [dataDomaine, loadingDomaine, errorDomaine] = useFetch(
    `${Constants.url}/labo_api/presentation_domaine`
  );

  const [dataLaboratoire, loadingLaboratoire, errorLaboratoire] = useFetch(
    `${Constants.url}/labo_api/laboratoire`
  );

  const contactPrincipal = contacts.find((c) => c.type_contact === "principal");
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-end gap-2 mb-6">
              {dataLaboratoire && dataLaboratoire.data.logo ? (
                <div
                  className="h-10 w-10"
                  style={{
                    backgroundImage: `url(${
                      Constants.urlDomaine
                    }static${dataLaboratoire.data.logo
                      .split("/static")
                      .join("")})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ) : (
                <Microscope className="h-8 w-8 text-primary" />
              )}

              <span className="text-xl font-bold">
                {dataLaboratoire && dataLaboratoire.data.nom
                  ? dataLaboratoire.data.nom
                  : "Labo"}
              </span>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              {dataLaboratoire && dataLaboratoire.data.description
                ? dataLaboratoire.data.description
                : "Laboratoire de recherche universitaire d'excellence, pionnier dans l'innovation scientifique et technologique depuis plus de 20 ans."}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to={"/"}
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  to={"/team"}
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Équipe
                </Link>
              </li>
              <li>
                <Link
                  to={"/research"}
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Recherches
                </Link>
              </li>
              <li>
                <Link
                  to={"/publications"}
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  to={"/news"}
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Actualités
                </Link>
              </li>
            </ul>
          </div>

          {dataDomaine && (
            <div>
              <h4 className="text-lg font-semibold mb-6">Domaines</h4>
              <ul className="space-y-3">
                {dataDomaine.data.slice(0, 6).map((data, id) => (
                  <li key={id}>
                    <span className="text-background/80">
                      {data.id_domaine.titre}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-background/80 text-sm">
                  {contactPrincipal && contactPrincipal.adresse_complete
                    ? contactPrincipal.adresse_complete
                    : "abobo-adjame"}
                  <br />
                  {contactPrincipal && contactPrincipal.ville
                    ? contactPrincipal.ville
                    : "Abidjan"}
                  ,{" "}
                  {contactPrincipal && contactPrincipal.pays
                    ? contactPrincipal.pays
                    : "Cote d'ivoire"}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-background/80 text-sm">
                  +225{" "}
                  {contactPrincipal && contactPrincipal.telephone_principal
                    ? contactPrincipal.telephone_principal
                    : "01 01 01 01 01"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-background/80 text-sm">
                  {contactPrincipal && contactPrincipal.email_principal
                    ? contactPrincipal.email_principal
                    : "labo@gmail.com"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-5 pt-5">
          <p className="text-background/60 text-sm text-center">
            © 2024{" "}
            {dataLaboratoire && dataLaboratoire.data.nom
              ? dataLaboratoire.data.nom
              : "Labo"}
            . Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
