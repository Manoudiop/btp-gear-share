
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle, AlertTriangle, MoreHorizontal,
  Edit, Trash2, Download, Filter, Search,
  Eye, Star, Building
} from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  useListings,
  listingCategoriesOf,
  useSetListingStatus,
  useToggleListingFeatured,
  useRemoveListing,
} from "@/data/listings";
import type { ListingStatus } from "@/data/types";
import { useLanguage } from "@/contexts/LanguageContext";


const ManageEquipment = () => {
  const { t, formatPrice } = useLanguage();
  const { data: listings = [] } = useListings("admin");
  const setStatus = useSetListingStatus();
  const toggleFeaturedListing = useToggleListingFeatured();
  const removeListing = useRemoveListing();
  const listingCategories = useMemo(() => listingCategoriesOf(listings), [listings]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredEquipment = listings.filter(
    (item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        item.category.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesCategory;
    }
  );

  const handleStatusChange = (id: string, newStatus: ListingStatus) => {
    setStatus.mutate({ id, status: newStatus });
    toast({
      title: "Statut modifié",
      description: `L'équipement a été ${newStatus === "approved" ? "approuvé" : newStatus === "rejected" ? "rejeté" : "mis en attente"}.`
    });
  };

  const toggleFeatured = (id: string, currentFeatured: boolean) => {
    toggleFeaturedListing.mutate({ id, featured: !currentFeatured });
    toast({
      title: currentFeatured ? "Retiré des équipements mis en avant" : "Ajouté aux équipements mis en avant",
      description: "Le statut mis en avant a été modifié avec succès."
    });
  };

  const handleDelete = (id: string, name: string) => {
    removeListing.mutate(id);
    toast({
      title: "Équipement supprimé",
      description: `${name} a été retiré de la plateforme.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{t("bo.approved")}</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{t("bo.pending")}</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{t("bo.rejected")}</Badge>;
      default:
        return <Badge variant="outline">{t("bo.undefined")}</Badge>;
    }
  };

  return (
    <AccountLayout title={t("bo.manageEquipment")}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>{t("bo.equipment")}</CardTitle>
            <CardDescription>
              {t("bo.manageEquipmentDesc")}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("bo.searchEquipment")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("bo.allCategories")}</SelectItem>
                  {listingCategories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("bo.allStatuses")}</SelectItem>
                  <SelectItem value="approved">{t("bo.approved")}</SelectItem>
                  <SelectItem value="pending">{t("bo.pending")}</SelectItem>
                  <SelectItem value="rejected">{t("bo.rejected")}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              <Download className="mr-2 h-4 w-4" />
              {t("bo.export")}
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("bo.equipment")}</TableHead>
                  <TableHead>{t("bo.owner")}</TableHead>
                  <TableHead>{t("bo.category")}</TableHead>
                  <TableHead>{t("bo.pricePerDay")}</TableHead>
                  <TableHead>{t("bo.status")}</TableHead>
                  <TableHead>{t("bo.featured")}</TableHead>
                  <TableHead>{t("bo.rating")}</TableHead>
                  <TableHead className="text-right">{t("bo.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {t("bo.noEquipment")}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEquipment.map((equipment) => (
                    <TableRow key={equipment.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md">
                            <img
                              src={equipment.image}
                              alt={equipment.name}
                              className="h-full w-full object-cover rounded-md"
                            />
                          </div>
                          <span className="font-medium">{equipment.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link to={`/account/users/${equipment.ownerId}`} className="hover:underline">
                          <div className="flex items-center">
                            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                            {equipment.owner}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>{equipment.category}</TableCell>
                      <TableCell>{formatPrice(equipment.price)}</TableCell>
                      <TableCell>{getStatusBadge(equipment.status)}</TableCell>
                      <TableCell>
                        {equipment.featured ? (
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{t("bo.featured")}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">{t("bo.notFeatured")}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                          <span>{equipment.rating > 0 ? equipment.rating.toFixed(1) : "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("bo.actions")}</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Link to={`/equipment/${equipment.id}`} className="flex items-center w-full">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>{t("bo.view")}</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/account/equipment/${equipment.id}/edit`} className="flex items-center w-full">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>{t("bo.edit")}</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {equipment.status !== "approved" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(equipment.id, "approved")}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                <span>{t("bo.approve")}</span>
                              </DropdownMenuItem>
                            )}
                            {equipment.status !== "pending" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(equipment.id, "pending")}>
                                <AlertTriangle className="mr-2 h-4 w-4 text-amber-600" />
                                <span>{t("bo.setPending")}</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => toggleFeatured(equipment.id, equipment.featured)}>
                              <Star className="mr-2 h-4 w-4" fill={equipment.featured ? "currentColor" : "none"} />
                              <span>
                                {equipment.featured ? t("bo.unfeature") : t("bo.feature")}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(equipment.id, equipment.name)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>{t("bo.delete")}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

export default ManageEquipment;
