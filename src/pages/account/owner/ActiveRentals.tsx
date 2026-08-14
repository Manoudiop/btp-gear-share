import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Search, Check, Play, X, Loader2 } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  useBookings,
  useUpdateBookingStatus,
  type BookingStatus,
} from "@/data/bookings";
import BookingStatusBadge from "@/components/account/BookingStatusBadge";

/**
 * Réservations reçues par le loueur.
 *
 * L'écran listait cinq locations écrites en dur, aux dates de 2023, et les
 * boutons n'appelaient personne. Il lit maintenant les réservations prises sur
 * ses propres annonces et fait avancer leur statut.
 */
const ActiveRentals = () => {
  const { t, formatPrice, locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: bookings = [], isLoading } = useBookings("owner");
  const updateStatus = useUpdateBookingStatus();

  const filteredRentals = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        needle === "" ||
        booking.renterName.toLowerCase().includes(needle) ||
        booking.equipmentName.toLowerCase().includes(needle) ||
        booking.reference.toLowerCase().includes(needle);

      return matchesSearch && (statusFilter === "all" || booking.status === statusFilter);
    });
  }, [bookings, searchTerm, statusFilter]);

  const advance = (id: string, status: BookingStatus, message: string) => {
    updateStatus.mutate(
      { id, status },
      {
        onSuccess: () => toast({ title: message }),
        onError: () => toast({ title: t("ar.updateError"), variant: "destructive" }),
      },
    );
  };

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <AccountLayout title={t("account.currentRentals")}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>{t("ar.title")}</CardTitle>
            <CardDescription>{t("ar.desc")}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("ar.search")}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-9"
              />
            </div>
            <div className="w-full sm:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t("bo.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("bo.allStatuses")}</SelectItem>
                  <SelectItem value="pending">{t("booking.pending")}</SelectItem>
                  <SelectItem value="confirmed">{t("booking.confirmed")}</SelectItem>
                  <SelectItem value="active">{t("booking.active")}</SelectItem>
                  <SelectItem value="completed">{t("booking.completed")}</SelectItem>
                  <SelectItem value="cancelled">{t("booking.cancelled")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("inc.client")}</TableHead>
                  <TableHead>{t("bo.equipment")}</TableHead>
                  <TableHead>{t("ar.period")}</TableHead>
                  <TableHead>{t("ar.price")}</TableHead>
                  <TableHead>{t("bo.status")}</TableHead>
                  <TableHead className="text-right">{t("bo.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center">
                      <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : filteredRentals.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      {t("ar.empty")}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRentals.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.renterName || "—"}
                        <div className="text-xs font-normal text-muted-foreground">
                          {booking.reference}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/equipment/${booking.equipmentId}`}
                          className="hover:underline"
                        >
                          {booking.equipmentName}
                        </Link>
                      </TableCell>
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
                        <div className="flex justify-end gap-2">
                          {booking.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  advance(booking.id, "cancelled", t("ar.declined"))
                                }
                              >
                                <X className="mr-1 h-4 w-4" />
                                <span className="hidden sm:inline">{t("ar.decline")}</span>
                              </Button>
                              <Button
                                size="sm"
                                onClick={() =>
                                  advance(booking.id, "confirmed", t("ar.accepted"))
                                }
                              >
                                <Check className="mr-1 h-4 w-4" />
                                <span className="hidden sm:inline">{t("ar.accept")}</span>
                              </Button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <Button
                              size="sm"
                              onClick={() => advance(booking.id, "active", t("ar.started"))}
                            >
                              <Play className="mr-1 h-4 w-4" />
                              <span className="hidden sm:inline">{t("ar.start")}</span>
                            </Button>
                          )}
                          {booking.status === "active" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                advance(booking.id, "completed", t("ar.returned"))
                              }
                            >
                              <Check className="mr-1 h-4 w-4" />
                              <span className="hidden sm:inline">{t("ar.return")}</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AccountLayout>
  );
};

export default ActiveRentals;
