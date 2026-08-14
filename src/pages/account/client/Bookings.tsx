import { Link } from "react-router-dom";
import { Calendar, Loader2, PackageOpen, X } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBookings, useUpdateBookingStatus } from "@/data/bookings";
import BookingStatusBadge from "@/components/account/BookingStatusBadge";

/** Réservations prises par le locataire, avec le nom du loueur en face. */
const Bookings = () => {
  const { t, formatPrice, locale } = useLanguage();
  const { data: bookings = [], isLoading } = useBookings("renter");
  const updateStatus = useUpdateBookingStatus();

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const cancel = (id: string) =>
    updateStatus.mutate(
      { id, status: "cancelled" },
      {
        onSuccess: () => toast({ title: t("bookings.cancelled") }),
        onError: () => toast({ title: t("ar.updateError"), variant: "destructive" }),
      },
    );

  return (
    <AccountLayout title={t("account.bookings")}>
      <Card>
        <CardHeader>
          <CardTitle>{t("bookings.title")}</CardTitle>
          <CardDescription>{t("bookings.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-12 text-center">
              <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-12 text-center">
              <PackageOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="mb-4 text-muted-foreground">{t("bookings.empty")}</p>
              <Button asChild>
                <Link to="/equipment">{t("bookings.browse")}</Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("bo.equipment")}</TableHead>
                    <TableHead>{t("bo.roleOwner")}</TableHead>
                    <TableHead>{t("ar.period")}</TableHead>
                    <TableHead>{t("ar.price")}</TableHead>
                    <TableHead>{t("bo.status")}</TableHead>
                    <TableHead className="text-right">{t("bo.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        <Link
                          to={`/equipment/${booking.equipmentId}`}
                          className="hover:underline"
                        >
                          {booking.equipmentName}
                        </Link>
                        <div className="text-xs font-normal text-muted-foreground">
                          {booking.reference}
                        </div>
                      </TableCell>
                      <TableCell>{booking.ownerName || "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{formatPrice(booking.total)}</TableCell>
                      <TableCell>
                        <BookingStatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {/* Une location engagée ne s'annule plus depuis l'interface. */}
                        {(booking.status === "pending" ||
                          booking.status === "confirmed") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancel(booking.id)}
                          >
                            <X className="mr-1 h-4 w-4" />
                            <span className="hidden sm:inline">{t("bookings.cancel")}</span>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </AccountLayout>
  );
};

export default Bookings;
