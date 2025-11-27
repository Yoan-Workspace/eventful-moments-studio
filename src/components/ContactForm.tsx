import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(100, { message: "Le nom doit contenir moins de 100 caractères" }),
  email: z.string()
    .trim()
    .email({ message: "Email invalide" })
    .max(255, { message: "L'email doit contenir moins de 255 caractères" }),
  phone: z.string()
    .trim()
    .min(10, { message: "Numéro de téléphone invalide" })
    .max(20, { message: "Numéro de téléphone trop long" })
    .optional()
    .or(z.literal("")),
  eventType: z.string()
    .trim()
    .min(2, { message: "Le type d'événement doit contenir au moins 2 caractères" })
    .max(100, { message: "Le type d'événement doit contenir moins de 100 caractères" }),
  message: z.string()
    .trim()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" })
    .max(1000, { message: "Le message doit contenir moins de 1000 caractères" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [showPhone, setShowPhone] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Configuration EmailJS - À remplacer avec vos vraies valeurs
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';
      await emailjs.send(
          serviceId,
          templateId,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || "Non renseigné",
          event_type: data.eventType,
          message: data.message,
        },
        publicKey
      );
      toast({
        title: "Message envoyé !",
        description: "Je vous répondrai dans les plus brefs délais.",
        variant: "success",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <Mail className="w-16 h-16 mx-auto mb-4 text-accent" />
          <h2 className="text-4xl font-serif mb-4 text-foreground">Demander un Devis</h2>
          <div className="mt-4 flex justify-center mb-8">
  {!showPhone ? (
    <Button
      onClick={() => setShowPhone(true)}
      className="bg-accent text-accent-foreground hover:bg-accent/90"
    >
      📞 Appelez-moi
    </Button>
  ) : (
    <p className="text-xl font-semibold text-accent">
      <a
        href="tel:+33677258431"
        className="text-xl font-semibold text-accent underline"
        aria-label="Appeler +33 6 77 25 84 31"
      >
        +33 6 77 25 84 31
      </a>
    </p>
  )}
</div>
          <p className="text-muted-foreground text-lg">
            Décrivez votre projet et je vous répondrai rapidement avec un devis personnalisé
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-lg elegant-shadow">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet *</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="votre@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="06 12 34 56 78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'événement *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Mariage, Spectacle, Festival..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre message *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre projet, la date prévue, vos attentes..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-serif text-lg h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Envoyer la demande
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
