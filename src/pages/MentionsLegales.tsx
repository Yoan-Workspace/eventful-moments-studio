import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <>
      <Helmet>
        <title>Mentions Légales - Photographe Événementiel dernière mise à jour 25 novembre 2025</title>
        <meta name="description" content="Mentions légales du site photographe événementiel" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
            ← Retour à l'accueil
          </Link>
          
          <h1 className="text-4xl font-bold mb-8 text-foreground">Mentions Légales</h1>
          
          <div className="space-y-8 text-foreground/90">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Éditeur du site</h2>
              <p className="mb-2">
                <strong>Raison sociale :</strong> Julie Montbeyre / Julie Montbeyre Photographie<br />
                <strong>Statut juridique :</strong> Auto-entrepreneur<br />
                <strong>SIRET :</strong> [Numéro SIRET]<br />
                <strong>Adresse :</strong> 2 rue du docteur Maurice Tenine, 91320 Wissoux <br />
                <strong>Email :</strong> julie.montbeyre@gmail.com<br />
                <strong>Téléphone :</strong> 06 77 25 84 31
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Directeur de la publication</h2>
              <p>Julie Montbeyre</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Hébergement</h2>
              <p className="mb-2">
                <strong>Hébergeur :</strong> Vercel <br />
                <strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
                <strong>Contact :</strong> https://vercel.com/contact
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Propriété intellectuelle</h2>
              <p className="mb-4">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                Les photographies présentées sur ce site sont la propriété exclusive de Julie Montbeyre. 
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, 
                quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Droit à l'image</h2>
              <p>
                Conformément aux dispositions légales en vigueur, toute personne photographiée dispose d'un droit à l'image. 
                Les photographies présentes sur ce site ont été réalisées avec l'autorisation des personnes concernées. 
                Si vous souhaitez exercer votre droit de retrait d'une photographie vous concernant, merci de nous contacter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Cookies</h2>
              <p>
                Ce site peut utiliser des cookies pour améliorer l'expérience utilisateur. 
                Vous pouvez configurer votre navigateur pour refuser les cookies. 
                Pour plus d'informations, consultez notre <Link to="/PolitiqueConfidentialite" className="text-primary hover:underline">politique de confidentialité</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Responsabilité</h2>
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour. 
                Toutefois, des erreurs ou omissions peuvent survenir. L'éditeur ne pourra être tenu responsable des dommages directs ou indirects 
                résultant de l'accès au site ou de l'utilisation du site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Liens hypertextes</h2>
              <p>
                Le site peut contenir des liens vers d'autres sites. L'éditeur n'exerce aucun contrôle sur ces sites externes et 
                décline toute responsabilité quant à leur contenu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Loi applicable</h2>
              <p>
                Les présentes mentions légales sont régies par le droit français. 
                En cas de litige et à défaut d'accord amiable, le tribunal compétent sera celui du ressort du siège social de l'éditeur.
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

export default MentionsLegales;
