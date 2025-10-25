import { useState, useCallback, useMemo, memo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, FileText, X } from "lucide-react";
import { useCandidature } from "@/hooks/useCandidature";
import { Card, CardContent } from "@/components/ui/card";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  masterTitle: string;
  parcoursId: number;
}

const ApplicationModal = memo(({ isOpen, onClose, masterTitle, parcoursId }: ApplicationModalProps) => {
  const { formData, isLoading, errors, isSubmitted, handleChange, handleSubmit, validateStep } = useCandidature(parcoursId);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Mémorisation des callbacks pour éviter les re-renders
  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < totalSteps) {
      nextStep();
      return;
    }
    
    const success = await handleSubmit(e);
    if (success) {
      onClose();
      setCurrentStep(1);
    }
  }, [currentStep, totalSteps, handleSubmit, onClose]);

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  }, [currentStep, totalSteps, validateStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleFileChange = useCallback((field: keyof typeof formData, file: File | null) => {
    handleChange(field, file);
  }, [handleChange]);

  // Mémorisation des données d'étape pour éviter les recalculs
  const currentStepFields = useMemo(() => ({
    1: ['nom_candidat', 'prenom_candidat', 'date_naissance', 'lieu_naissance', 'nationalite'],
    2: ['telephone_candidat', 'email_candidat', 'adresse_complete', 'ville_residence', 'pays_residence'],
    3: ['niveau_etude_actuel', 'etablissement_origine', 'filiere_etude', 'moyenne_generale', 'annee_obtention_diplome', 'cv_candidat', 'lettre_motivation', 'releves_notes', 'diplome_obtenu']
  }), []);

  // Filtrage optimisé des erreurs pour l'étape actuelle
  const currentStepErrors = useMemo(() => {
    return Object.entries(errors).filter(([field]) => 
      currentStepFields[currentStep as keyof typeof currentStepFields]?.includes(field)
    );
  }, [errors, currentStep, currentStepFields]);

  // Composant FileUpload optimisé
  const FileUploadField = memo(({ 
    field, 
    label, 
    required = true 
  }: { 
    field: keyof typeof formData; 
    label: string; 
    required?: boolean; 
  }) => {
    const file = formData[field] as File | null;
    
    return (
      <div>
        <Label htmlFor={field}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="mt-1">
          <div className="flex items-center gap-2">
            <Input
              id={field}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
              className={errors[field] ? 'border-red-500' : ''}
            />
            {file && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <FileText className="h-4 w-4" />
                <span className="truncate max-w-[100px]">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFileChange(field, null)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
          {errors[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">Formats acceptés: PDF, DOC, DOCX</p>
        </div>
      </div>
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Candidature - {masterTitle}
          </DialogTitle>
          <DialogDescription>
            Étape {currentStep} sur {totalSteps} - Veuillez remplir tous les champs obligatoires.
          </DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Affichage des erreurs pour l'étape actuelle uniquement */}
        {currentStepErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h4 className="text-red-800 font-semibold mb-2 flex items-center">
              ⚠️ Erreurs à corriger:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {currentStepErrors.map(([field, message]) => (
                <li key={field} className="text-red-700 text-sm">
                  <strong>{field}:</strong> {message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Étape 1: Informations personnelles */}
          {currentStep === 1 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom_candidat">
                      Nom de famille <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nom_candidat"
                      value={formData.nom_candidat}
                      onChange={(e) => handleChange('nom_candidat', e.target.value)}
                      placeholder="Votre nom de famille"
                      className={errors.nom_candidat ? 'border-red-500' : ''}
                    />
                    {errors.nom_candidat && (
                      <p className="text-red-500 text-xs mt-1">{errors.nom_candidat}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="prenom_candidat">
                      Prénom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="prenom_candidat"
                      value={formData.prenom_candidat}
                      onChange={(e) => handleChange('prenom_candidat', e.target.value)}
                      placeholder="Votre prénom"
                      className={errors.prenom_candidat ? 'border-red-500' : ''}
                    />
                    {errors.prenom_candidat && (
                      <p className="text-red-500 text-xs mt-1">{errors.prenom_candidat}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="date_naissance">
                      Date de naissance <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="date_naissance"
                      type="date"
                      value={formData.date_naissance}
                      onChange={(e) => handleChange('date_naissance', e.target.value)}
                      className={errors.date_naissance ? 'border-red-500' : ''}
                    />
                    {errors.date_naissance && (
                      <p className="text-red-500 text-xs mt-1">{errors.date_naissance}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lieu_naissance">
                      Lieu de naissance <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lieu_naissance"
                      value={formData.lieu_naissance}
                      onChange={(e) => handleChange('lieu_naissance', e.target.value)}
                      placeholder="Ville, Pays"
                      className={errors.lieu_naissance ? 'border-red-500' : ''}
                    />
                    {errors.lieu_naissance && (
                      <p className="text-red-500 text-xs mt-1">{errors.lieu_naissance}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="nationalite">
                      Nationalité <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nationalite"
                      value={formData.nationalite}
                      onChange={(e) => handleChange('nationalite', e.target.value)}
                      placeholder="Votre nationalité"
                      className={errors.nationalite ? 'border-red-500' : ''}
                    />
                    {errors.nationalite && (
                      <p className="text-red-500 text-xs mt-1">{errors.nationalite}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Étape 2: Informations de contact */}
          {currentStep === 2 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informations de contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telephone_candidat">
                      Téléphone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="telephone_candidat"
                      value={formData.telephone_candidat}
                      onChange={(e) => handleChange('telephone_candidat', e.target.value)}
                      placeholder="+225 XX XX XX XX"
                      className={errors.telephone_candidat ? 'border-red-500' : ''}
                    />
                    {errors.telephone_candidat && (
                      <p className="text-red-500 text-xs mt-1">{errors.telephone_candidat}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email_candidat">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email_candidat"
                      type="email"
                      value={formData.email_candidat}
                      onChange={(e) => handleChange('email_candidat', e.target.value)}
                      placeholder="exemple@domaine.com"
                      className={errors.email_candidat ? 'border-red-500' : ''}
                    />
                    {errors.email_candidat && (
                      <p className="text-red-500 text-xs mt-1">{errors.email_candidat}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="adresse_complete">
                      Adresse complète <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="adresse_complete"
                      value={formData.adresse_complete}
                      onChange={(e) => handleChange('adresse_complete', e.target.value)}
                      placeholder="Rue, quartier, ville..."
                      rows={3}
                      className={errors.adresse_complete ? 'border-red-500' : ''}
                    />
                    {errors.adresse_complete && (
                      <p className="text-red-500 text-xs mt-1">{errors.adresse_complete}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="ville_residence">
                      Ville de résidence <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="ville_residence"
                      value={formData.ville_residence}
                      onChange={(e) => handleChange('ville_residence', e.target.value)}
                      placeholder="Votre ville"
                      className={errors.ville_residence ? 'border-red-500' : ''}
                    />
                    {errors.ville_residence && (
                      <p className="text-red-500 text-xs mt-1">{errors.ville_residence}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="pays_residence">
                      Pays de résidence <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="pays_residence"
                      value={formData.pays_residence}
                      onChange={(e) => handleChange('pays_residence', e.target.value)}
                      placeholder="Votre pays"
                      className={errors.pays_residence ? 'border-red-500' : ''}
                    />
                    {errors.pays_residence && (
                      <p className="text-red-500 text-xs mt-1">{errors.pays_residence}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Étape 3: Informations académiques et documents */}
          {currentStep === 3 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informations académiques et documents</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="niveau_etude_actuel">
                        Niveau d'étude actuel <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={formData.niveau_etude_actuel} 
                        onValueChange={(value) => handleChange('niveau_etude_actuel', value)}
                      >
                        <SelectTrigger className={errors.niveau_etude_actuel ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Sélectionnez votre niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Licence">Licence (Bac+3)</SelectItem>
                          <SelectItem value="Master 1">Master 1 (Bac+4)</SelectItem>
                          <SelectItem value="Master 2">Master 2 (Bac+5)</SelectItem>
                          <SelectItem value="Doctorat">Doctorat (Bac+8)</SelectItem>
                          <SelectItem value="Autre">Autre niveau</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.niveau_etude_actuel && (
                        <p className="text-red-500 text-xs mt-1">{errors.niveau_etude_actuel}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="etablissement_origine">
                        Établissement d'origine <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="etablissement_origine"
                        value={formData.etablissement_origine}
                        onChange={(e) => handleChange('etablissement_origine', e.target.value)}
                        placeholder="Nom de votre établissement"
                        className={errors.etablissement_origine ? 'border-red-500' : ''}
                      />
                      {errors.etablissement_origine && (
                        <p className="text-red-500 text-xs mt-1">{errors.etablissement_origine}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="filiere_etude">
                        Filière d'étude <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="filiere_etude"
                        value={formData.filiere_etude}
                        onChange={(e) => handleChange('filiere_etude', e.target.value)}
                        placeholder="Votre filière d'étude"
                        className={errors.filiere_etude ? 'border-red-500' : ''}
                      />
                      {errors.filiere_etude && (
                        <p className="text-red-500 text-xs mt-1">{errors.filiere_etude}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="moyenne_generale">
                        Moyenne générale <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="moyenne_generale"
                        type="number"
                        step="0.01"
                        min="0"
                        max="25"
                        value={formData.moyenne_generale}
                        onChange={(e) => handleChange('moyenne_generale', e.target.value)}
                        placeholder="Ex: 15.5 (sur 20) ou 85 (sur 100)"
                        className={errors.moyenne_generale ? 'border-red-500' : ''}
                      />
                      {errors.moyenne_generale && (
                        <p className="text-red-500 text-xs mt-1">{errors.moyenne_generale}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="annee_obtention_diplome">
                        Année d'obtention du diplôme <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="annee_obtention_diplome"
                        type="number"
                        min="1980"
                        max={new Date().getFullYear() + 5}
                        value={formData.annee_obtention_diplome}
                        onChange={(e) => handleChange('annee_obtention_diplome', e.target.value)}
                        placeholder="2024"
                        className={errors.annee_obtention_diplome ? 'border-red-500' : ''}
                      />
                      {errors.annee_obtention_diplome && (
                        <p className="text-red-500 text-xs mt-1">{errors.annee_obtention_diplome}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <FileUploadField 
                      field="cv_candidat" 
                      label="Curriculum Vitae" 
                      required 
                    />
                    <FileUploadField 
                      field="lettre_motivation" 
                      label="Lettre de motivation" 
                      required 
                    />
                    <FileUploadField 
                      field="releves_notes" 
                      label="Relevés de notes" 
                      required 
                    />
                    <FileUploadField 
                      field="diplome_obtenu" 
                      label="Copie du diplôme" 
                      required={false} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-6">
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={isLoading}
                >
                  Précédent
                </Button>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onClose();
                  setCurrentStep(1);
                }}
                disabled={isLoading}
              >
                Annuler
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={() => {
                    nextStep();
                  }}
                  disabled={isLoading}
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    'Envoyer la candidature'
                  )}
                </Button>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-2">
            <span className="text-red-500">*</span> Champs obligatoires
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default ApplicationModal;
