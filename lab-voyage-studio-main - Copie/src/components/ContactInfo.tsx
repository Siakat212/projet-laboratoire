import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

import { contactApiService } from '@/services/contactApi';
import { ContactLaboratoireList, HoraireLaboratoire } from '@/types/contact';
import { JOURS_SEMAINE } from '@/types/contact';

interface ContactInfoProps {
  laboratoryId?: number;
  className?: string;
}

interface ContactInfoDisplayProps {
  contacts: ContactLaboratoireList[];
  loading?: boolean;
}

const ContactInfoDisplay: React.FC<ContactInfoDisplayProps> = ({ contacts, loading }) => {
  const [horaires, setHoraires] = useState<Record<number, HoraireLaboratoire[]>>({});
  const [loadingHoraires, setLoadingHoraires] = useState(false);

  // Charger les horaires pour les contacts principaux
  useEffect(() => {
    const loadHoraires = async () => {
      if (contacts.length === 0) return;
      
      setLoadingHoraires(true);
      try {
        const horairePromises = contacts
          .filter(contact => contact.type_contact === 'principal')
          .map(async (contact) => {
            try {
              const contactHoraires = await contactApiService.getContactHoraires(contact.id);
              return { contactId: contact.id, horaires: contactHoraires };
            } catch (error) {
              console.error(`Erreur lors du chargement des horaires pour le contact ${contact.id}:`, error);
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
        console.error('Erreur lors du chargement des horaires:', error);
      } finally {
        setLoadingHoraires(false);
      }
    };

    loadHoraires();
  }, [contacts]);

  // Formater les horaires pour l'affichage
  const formatHoraires = (contactHoraires: HoraireLaboratoire[]) => {
    if (!contactHoraires || contactHoraires.length === 0) {
      // Horaires par défaut si aucune donnée n'est disponible
      return 'Lundi - Vendredi : 8h00 - 18h00\nSamedi : 9h00 - 12h00\nDimanche : Fermé';
    }

    const horairesSorted = contactHoraires
      .sort((a, b) => a.jour_semaine - b.jour_semaine)
      .filter(h => !h.est_ferme);

    if (horairesSorted.length === 0) {
      return 'Fermé tous les jours';
    }

    // Grouper les jours consécutifs avec les mêmes horaires
    const groupes: { jours: string[], horaires: string }[] = [];
    let currentGroup: { jours: string[], horaires: string } | null = null;

    horairesSorted.forEach(horaire => {
      const jourLabel = JOURS_SEMAINE.find(j => j.value === horaire.jour_semaine)?.label || '';
      const horaireText = `${horaire.heure_ouverture} - ${horaire.heure_fermeture}`;

      if (!currentGroup || currentGroup.horaires !== horaireText) {
        if (currentGroup) {
          groupes.push(currentGroup);
        }
        currentGroup = { jours: [jourLabel], horaires: horaireText };
      } else {
        currentGroup.jours.push(jourLabel);
      }
    });

    if (currentGroup) {
      groupes.push(currentGroup);
    }

    return groupes.map(groupe => {
      const joursText = groupe.jours.length > 1 
        ? `${groupe.jours[0]} - ${groupe.jours[groupe.jours.length - 1]}`
        : groupe.jours[0];
      return `${joursText} : ${groupe.horaires}`;
    }).join('\n');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>🔍 Aucune information de contact trouvée</p>
        <p className="text-sm mt-2">Vérifiez la configuration de la base de données</p>
      </div>
    );
  }

  // Trouver le contact principal
  const contactPrincipal = contacts.find(c => c.type_contact === 'principal');
  const autresContacts = contacts.filter(c => c.type_contact !== 'principal');

  return (
    <div className="space-y-6">
      {/* Contact principal - Adresse */}
      {contactPrincipal && (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300 group">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Adresse</h4>
            <p className="text-muted-foreground leading-relaxed">
              {contactPrincipal.laboratoire_nom}<br />
              {/* Utiliser l'adresse depuis la base de données */}
              {contactPrincipal.adresse_complete ? (
                contactPrincipal.adresse_complete.split('\n').map((ligne, index) => (
                  <span key={index}>{ligne}<br /></span>
                ))
              ) : (
                <>
                  {contactPrincipal.ville}, {contactPrincipal.pays || 'Côte d\'Ivoire'}<br />
                  {contactPrincipal.code_postal && `${contactPrincipal.code_postal} `}
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Téléphones */}
      {contacts.some(c => c.telephone_principal) && (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300 group">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Téléphone</h4>
            <div className="text-muted-foreground space-y-1">
              {contacts
                .filter(c => c.telephone_principal)
                .map((contact, index) => (
                  <p key={index}>
                    {contact.type_contact_display}: {contact.telephone_principal}
                  </p>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Emails */}
      {contacts.some(c => c.email_principal) && (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300 group">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Email</h4>
            <div className="text-muted-foreground space-y-1">
              {contacts
                .filter(c => c.email_principal)
                .map((contact, index) => (
                  <p key={index}>
                    {contact.type_contact_display}: {contact.email_principal}
                  </p>
                ))}
            </div>
            {/* Site web si disponible */}
            {contactPrincipal && (contactPrincipal as any).site_web && (
              <div className="mt-2">
                <a
                  className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80"
                  href={(contactPrincipal as any).site_web}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visiter le site web
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Horaires */}
      {contactPrincipal && (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300 group">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Horaires</h4>
            {loadingHoraires ? (
              <div className="animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-32 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-28"></div>
              </div>
            ) : (
              <p className="text-muted-foreground whitespace-pre-line">
                {formatHoraires(horaires[contactPrincipal.id] || [])}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Autres contacts (optionnel) */}
      {autresContacts.length > 0 && (
        <div className="space-y-3">
          {autresContacts.map((c, idx) => (
            <div key={idx} className="text-sm text-muted-foreground">
              {c.type_contact_display}: {c.email_principal || c.telephone_principal || c.adresse_complete}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ContactInfo: React.FC<ContactInfoProps> = ({ laboratoryId, className }) => {
  const [contacts, setContacts] = useState<ContactLaboratoireList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await contactApiService.getContacts({
          laboratoire_id: laboratoryId,
        });
        // Réponses paginées standard DRF
        if (response && Array.isArray((response as any).results)) {
          const activeContacts = (response as any).results.filter((c: ContactLaboratoireList) => c.est_actif);
          setContacts(activeContacts);
        } else if (Array.isArray(response as any)) {
          const activeContacts = (response as any).filter((c: ContactLaboratoireList) => c.est_actif);
          setContacts(activeContacts);
        } else {
          // Format inattendu -> considérer comme vide
          setContacts([]);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des contacts';
        setError(errorMessage);
        console.error('Erreur lors du chargement des contacts:', err);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [laboratoryId]);

  if (error && contacts.length === 0) {
    return (
      <div className={className}>
        <div className="text-center text-red-600 py-4 bg-red-50 rounded-lg border border-red-200">
          <p className="font-medium">Erreur lors du chargement des informations de contact</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ContactInfoDisplay contacts={contacts} loading={loading} />
    </div>
  );
};

export default ContactInfo;