import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import type { BookingStatus } from "@/data/bookings";

/** Les deux côtés de la réservation lisent le même statut, avec la même couleur. */
const TONES: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  confirmed: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  active: "bg-green-100 text-green-800 hover:bg-green-200",
  completed: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
};

const BookingStatusBadge = ({ status }: { status: BookingStatus }) => {
  const { t } = useLanguage();
  return <Badge className={TONES[status]}>{t(`booking.${status}`)}</Badge>;
};

export default BookingStatusBadge;
