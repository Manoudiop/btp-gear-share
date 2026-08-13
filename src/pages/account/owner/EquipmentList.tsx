
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus, Edit, Trash2, EyeIcon,
  ArrowUpDown, ChevronDown, MoreHorizontal,
  Filter, Download
} from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { useListings, removeListing } from "@/data/listings";
import { useLanguage } from "@/contexts/LanguageContext";


const EquipmentList = () => {
  const { t, formatPrice } = useLanguage();
  const listings = useListings();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEquipment = listings.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    removeListing(id);
    toast({
      title: t("bo.equipmentDeleted"),
      description: t("bo.equipmentDeletedDesc")
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{t("bo.available")}</Badge>;
      case "rented":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{t("bo.rented")}</Badge>;
      case "maintenance":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">{t("bo.maintenance")}</Badge>;
      default:
        return <Badge variant="outline">{t("bo.unavailable")}</Badge>;
    }
  };

  return (
    <AccountLayout title={t("account.myEquipment")}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>{t("bo.equipment")}</CardTitle>
            <CardDescription>
              {t("bo.myEquipmentDesc")}
            </CardDescription>
          </div>
          <Link to="/account/equipment/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("bo.addEquipment")}
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 w-full max-w-sm">
              <Input
                placeholder={t("bo.searchEquipmentSimple")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              {t("bo.export")}
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">{t("bo.image")}</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      {t("bo.name")}
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>{t("bo.category")}</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      {t("bo.pricePerDay")}
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>{t("bo.status")}</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      {t("bo.rentals")}
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      {t("bo.revenue")}
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right w-[100px]">{t("bo.actions")}</TableHead>
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
                        <div className="h-12 w-12 rounded-md bg-secondary/20">
                          <img
                            src={equipment.image}
                            alt={equipment.name}
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {equipment.name}
                      </TableCell>
                      <TableCell>{equipment.category}</TableCell>
                      <TableCell>{formatPrice(equipment.price)}</TableCell>
                      <TableCell>{getStatusBadge(equipment.availability)}</TableCell>
                      <TableCell>{equipment.rentals}</TableCell>
                      <TableCell>{formatPrice(equipment.income)}</TableCell>
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
                                <EyeIcon className="mr-2 h-4 w-4" />
                                <span>{t("bo.view")}</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/account/equipment/edit/${equipment.id}`} className="flex items-center w-full">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>{t("bo.edit")}</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(equipment.id)}
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

export default EquipmentList;
