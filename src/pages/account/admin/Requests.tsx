import { useState } from "react";
import { Check, Loader2, Mail, Phone, RotateCcw } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useContactMessages,
  useOwnerApplications,
  useQuotes,
  useMarkHandled,
  type RequestTable,
} from "@/data/requests";
import {
  EQUIPMENT_TYPES,
  PROJECT_DURATIONS,
  PROJECT_TYPES,
  RENTAL_DURATIONS,
  labelOf,
} from "@/data/quoteOptions";

/**
 * Demandes entrantes.
 *
 * Messages, devis et candidatures étaient enregistrés sans que rien ne les
 * montre : il fallait ouvrir la base pour savoir qu'on en avait reçu.
 */

interface EntryProps {
  table: RequestTable;
  id: string;
  handled: boolean;
  title: string;
  email: string;
  phone?: string;
  createdAt: string;
  children: React.ReactNode;
}

const Entry = ({
  table,
  id,
  handled,
  title,
  email,
  phone,
  createdAt,
  children,
}: EntryProps) => {
  const { t, locale } = useLanguage();
  const markHandled = useMarkHandled();

  const toggle = () =>
    markHandled.mutate(
      { table, id, handled: !handled },
      {
        onError: () =>
          toast({ title: t("req.updateFailed"), variant: "destructive" }),
      },
    );

  return (
    <Card className={handled ? "opacity-60" : undefined}>
      <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            {/* Répondre est le geste attendu : le contact est cliquable. */}
            <a href={`mailto:${email}`} className="flex items-center gap-1 hover:underline">
              <Mail className="h-3.5 w-3.5" />
              {email}
            </a>
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-1 hover:underline">
                <Phone className="h-3.5 w-3.5" />
                {phone}
              </a>
            )}
            <span>
              {new Date(createdAt).toLocaleString(locale === "en" ? "en-GB" : "fr-FR")}
            </span>
          </CardDescription>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {handled && <Badge variant="secondary">{t("req.handled")}</Badge>}
          <Button
            variant={handled ? "ghost" : "default"}
            size="sm"
            onClick={toggle}
            disabled={markHandled.isPending}
          >
            {handled ? (
              <>
                <RotateCcw className="mr-1 h-4 w-4" />
                {t("req.reopen")}
              </>
            ) : (
              <>
                <Check className="mr-1 h-4 w-4" />
                {t("req.markHandled")}
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">{children}</CardContent>
    </Card>
  );
};

const Empty = ({ label }: { label: string }) => (
  <p className="py-12 text-center text-muted-foreground">{label}</p>
);

const Pending = () => (
  <div className="py-12 text-center">
    <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
  </div>
);

const Field = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <p>
      <span className="text-muted-foreground">{label} : </span>
      {value}
    </p>
  ) : null;

const Requests = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState("messages");

  const messages = useContactMessages();
  const quotes = useQuotes();
  const applications = useOwnerApplications();

  // Le compteur ne porte que sur ce qui reste à traiter : c'est la seule
  // quantité qui demande une action.
  const pending = (rows?: { handled: boolean }[]) =>
    (rows ?? []).filter((row) => !row.handled).length;

  const label = (key: string, rows?: { handled: boolean }[]) => {
    const count = pending(rows);
    return count > 0 ? `${t(key)} (${count})` : t(key);
  };

  return (
    <AccountLayout title={t("account.requests")}>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="messages">
            {label("req.messages", messages.data)}
          </TabsTrigger>
          <TabsTrigger value="quotes">{label("req.quotes", quotes.data)}</TabsTrigger>
          <TabsTrigger value="applications">
            {label("req.applications", applications.data)}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          {messages.isLoading ? (
            <Pending />
          ) : (messages.data ?? []).length === 0 ? (
            <Empty label={t("req.noMessages")} />
          ) : (
            messages.data?.map((message) => (
              <Entry
                key={message.id}
                table="contact_messages"
                id={message.id}
                handled={message.handled}
                title={`${message.name} — ${t(`contact.subject.${message.subject}`)}`}
                email={message.email}
                phone={message.phone}
                createdAt={message.createdAt}
              >
                <p className="whitespace-pre-wrap">{message.message}</p>
              </Entry>
            ))
          )}
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          {quotes.isLoading ? (
            <Pending />
          ) : (quotes.data ?? []).length === 0 ? (
            <Empty label={t("req.noQuotes")} />
          ) : (
            quotes.data?.map((quote) => (
              <Entry
                key={quote.id}
                table="quotes"
                id={quote.id}
                handled={quote.handled}
                title={quote.company ? `${quote.fullName} — ${quote.company}` : quote.fullName}
                email={quote.email}
                phone={quote.phone}
                createdAt={quote.createdAt}
              >
                <Field
                  label={t("req.project")}
                  value={labelOf(PROJECT_TYPES, quote.projectType, t)}
                />
                <Field label={t("req.location")} value={quote.projectLocation} />
                <Field
                  label={t("req.duration")}
                  value={labelOf(PROJECT_DURATIONS, quote.projectDuration, t)}
                />
                <Field label={t("req.start")} value={quote.projectStartDate} />
                <Field
                  label={t("req.equipment")}
                  value={
                    quote.equipmentTypes
                      .map((type) => labelOf(EQUIPMENT_TYPES, type, t))
                      .join(", ") || undefined
                  }
                />
                <Field
                  label={t("req.rentalDuration")}
                  value={labelOf(RENTAL_DURATIONS, quote.equipmentDuration, t)}
                />
                <Field label={t("req.notes")} value={quote.additionalRequirements} />
              </Entry>
            ))
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          {applications.isLoading ? (
            <Pending />
          ) : (applications.data ?? []).length === 0 ? (
            <Empty label={t("req.noApplications")} />
          ) : (
            applications.data?.map((application) => (
              <Entry
                key={application.id}
                table="owner_applications"
                id={application.id}
                handled={application.handled}
                title={
                  application.company
                    ? `${application.firstName} ${application.lastName} — ${application.company}`
                    : `${application.firstName} ${application.lastName}`
                }
                email={application.email}
                phone={application.phone}
                createdAt={application.createdAt}
              >
                <Field
                  label={t("req.address")}
                  value={`${application.address}, ${application.postalCode} ${application.city}`}
                />
                <Field label={t("req.equipment")} value={application.equipmentTypes} />
                <Field label={t("req.notes")} value={application.description} />
              </Entry>
            ))
          )}
        </TabsContent>
      </Tabs>
    </AccountLayout>
  );
};

export default Requests;
