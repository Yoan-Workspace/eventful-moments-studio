import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité - Photographe Événementiel dernière mise à jour 25 novembre 2025</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
            ← Retour à l'accueil
          </Link>
          
          <h1 className="text-4xl font-bold mb-8 text-foreground">Politique de Confidentialité</h1>
          
          <div className="space-y-8 text-foreground/90">
            <section>
              <p className="mb-4">
                Dernière mise à jour : 25 novembre 2025 {/*  {new Date().toLocaleDateString('fr-FR')} */}
              </p>
              <p>
                La présente politique de confidentialité définit et vous informe de la manière dont Julie Montbeyre 
                utilise et protège les informations que vous nous transmettez, le cas échéant, lorsque vous utilisez le présent site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Collecte des données personnelles</h2>
              <p className="mb-4">
                Les données personnelles collectées sur ce site sont les suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone (optionnel)</li>
                <li>Message via le formulaire de contact</li>
              </ul>
              <p className="mt-4">
                Ces données sont collectées lorsque vous remplissez le formulaire de contact ou de demande de devis sur notre site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Utilisation des données</h2>
              <p className="mb-4">
                Les données personnelles collectées auprès des utilisateurs ont pour objectif :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Répondre à vos demandes de renseignements</li>
                <li>Établir des devis pour nos prestations photographiques</li>
                <li>Gérer les contrats de prestation</li>
                <li>Vous envoyer des informations sur nos services (avec votre consentement)</li>
              </ul>
              <p className="mt-4">
                Vos données ne seront jamais cédées, vendues ou échangées à des tiers sans votre consentement explicite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Droit d'accès et de rectification</h2>
              <p className="mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
                vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification de vos données</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d'opposition au traitement de vos données</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse : julie.montbeyre@gmail.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Durée de conservation</h2>
              <p>
                Vos données personnelles sont conservées pendant la durée nécessaire à la gestion de votre demande, 
                puis pendant une durée de 3 ans à compter de notre dernier contact, conformément aux obligations légales en matière de prospection commerciale.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées afin de garantir 
                la sécurité et la confidentialité de vos données personnelles et notamment empêcher qu'elles soient déformées, 
                endommagées ou que des tiers non autorisés y aient accès.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Cookies</h2>
              <p className="mb-4">
                Ce site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte 
                stockés sur votre appareil lors de la visite d'un site web.
              </p>
              <p className="mb-4">
                <strong>Types de cookies utilisés :</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                <li><strong>Cookies de performance :</strong> permettent d'améliorer les fonctionnalités du site</li>
                <li><strong>Cookies analytiques :</strong> permettent de mesurer l'audience du site </li>
              </ul>
              <p className="mt-4">
                Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur. 
                Cependant, cela peut affecter certaines fonctionnalités du site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Droit à l'image</h2>
              <p>
                Les photographies présentées sur ce site ont été réalisées dans le cadre de prestations professionnelles. 
                Le droit à l'image de chaque personne photographiée est respecté conformément à la législation en vigueur. 
                Si vous apparaissez sur l'une des photographies et souhaitez qu'elle soit retirée, contactez-nous.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Modifications de la politique</h2>
              <p>
                Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment. 
                Toute modification sera publiée sur cette page avec une date de mise à jour actualisée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Contact</h2>
              <p className="mb-2">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
                vous pouvez nous contacter :
              </p>
              <p>
                <strong>Email :</strong> julie.montbeyre@gmail.com<br />
                <strong>Téléphone :</strong> 06 77 25 84 31 <br />
                <strong>Adresse :</strong> 2 rue du docteur Maurice Tenine, 91320 Wissous
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Réclamation</h2>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous avez la possibilité d'introduire une réclamation 
                auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
              </p>
              <p className="mt-2">
                <strong>CNIL</strong><br />
                3 Place de Fontenoy - TSA 80715<br />
                75334 PARIS CEDEX 07<br />
                Tél : 01 53 73 22 22<br />
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  www.cnil.fr
                </a>
              </p>
            </section>
          </div>
        </div>
         {/* Footer */}
              <Footer />
      </div>
    </>
  );
};

export default PolitiqueConfidentialite;
