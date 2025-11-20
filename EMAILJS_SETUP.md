# Configuration EmailJS

## Étapes de configuration

1. **Créer un compte EmailJS**
   - Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
   - Créez un compte gratuit

2. **Créer un Service Email**
   - Dans le dashboard EmailJS, allez dans "Email Services"
   - Cliquez sur "Add New Service"
   - Choisissez votre fournisseur email (Gmail, Outlook, etc.)
   - Suivez les instructions pour connecter votre email
   - Notez votre **Service ID**

3. **Créer un Template Email**
   - Allez dans "Email Templates"
   - Cliquez sur "Create New Template"
   - Utilisez ce template comme exemple :

   ```
   Sujet: Nouvelle demande de devis - {{event_type}}

   Corps du message:
   Nouvelle demande de devis reçue !

   Nom: {{from_name}}
   Email: {{from_email}}
   Téléphone: {{phone}}
   Type d'événement: {{event_type}}

   Message:
   {{message}}
   ```

   - Notez votre **Template ID**

4. **Récupérer votre Public Key**
   - Allez dans "Account" > "General"
   - Copiez votre **Public Key**

5. **Configurer les variables d'environnement**
   - Créez un fichier `.env` à la racine du projet
   - Copiez le contenu de `.env.example`
   - Remplacez les valeurs par vos vraies valeurs EmailJS :

   ```
   VITE_EMAILJS_SERVICE_ID=votre_service_id
   VITE_EMAILJS_TEMPLATE_ID=votre_template_id
   VITE_EMAILJS_PUBLIC_KEY=votre_public_key
   ```

6. **Tester le formulaire**
   - Redémarrez votre serveur de développement
   - Remplissez et soumettez le formulaire de contact
   - Vérifiez que vous recevez bien l'email

## Variables de template EmailJS

Assurez-vous que votre template EmailJS utilise ces variables :
- `{{from_name}}` - Nom du contact
- `{{from_email}}` - Email du contact
- `{{phone}}` - Téléphone du contact
- `{{event_type}}` - Type d'événement
- `{{message}}` - Message du contact

## Limites du plan gratuit

Le plan gratuit EmailJS permet :
- 200 emails par mois
- 1 template email
- Support communautaire

Pour plus d'emails, consultez les plans payants sur [https://www.emailjs.com/pricing/](https://www.emailjs.com/pricing/)
