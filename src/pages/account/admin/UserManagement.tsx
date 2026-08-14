
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus, Edit, Trash2, MoreHorizontal,
  UserPlus, Download, Filter, Search,
  CheckCircle, AlertTriangle, Ban
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useUsers, useSetUserStatus, useRemoveUser } from "@/data/users";
import type { UserStatus } from "@/data/users";
import { useLanguage } from "@/contexts/LanguageContext";


const formatDay = (value: string) =>
  value ? new Date(value).toLocaleDateString() : "—";

const UserManagement = () => {
  const { t } = useLanguage();
  const { data: usersData = [] } = useUsers();
  const setUserStatus = useSetUserStatus();
  const removeUser = useRemoveUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filteredUsers = usersData.filter(
    (user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    }
  );

  const handleDelete = (id: string) => {
    setSelectedUserId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUserId) removeUser.mutate(selectedUserId);
    toast({
      title: t("bo.userDeleted"),
      description: t("bo.userDeletedDesc")
    });
    setIsDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleStatusChange = (id: string, newStatus: UserStatus) => {
    const statusMessages: Record<UserStatus, string> = {
      active: "activé",
      inactive: "désactivé",
      suspended: "suspendu",
    };

    setUserStatus.mutate({ id, status: newStatus });
    toast({
      title: `Utilisateur ${statusMessages[newStatus]}`,
      description: "Le statut de l'utilisateur a été mis à jour avec succès.",
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{t("bo.roleAdmin")}</Badge>;
      case "owner":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{t("bo.roleOwner")}</Badge>;
      case "client":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{t("bo.roleClient")}</Badge>;
      default:
        return <Badge variant="outline">{t("bo.undefined")}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "inactive":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "suspended":
        return <Ban className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <AccountLayout title={t("bo.manageUsers")}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>{t("bo.users")}</CardTitle>
            <CardDescription>
              {t("bo.manageUsersDesc")}
            </CardDescription>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            {t("bo.addUser")}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("bo.searchUser")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("bo.allRoles")}</SelectItem>
                  <SelectItem value="admin">{t("bo.roleAdmin")}</SelectItem>
                  <SelectItem value="owner">{t("bo.roleOwner")}</SelectItem>
                  <SelectItem value="client">{t("bo.roleClient")}</SelectItem>
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
                  <SelectItem value="active">{t("bo.statusActive")}</SelectItem>
                  <SelectItem value="inactive">{t("bo.statusInactive")}</SelectItem>
                  <SelectItem value="suspended">{t("bo.statusSuspended")}</SelectItem>
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
                  <TableHead>{t("bo.name")}</TableHead>
                  <TableHead>{t("auth.email")}</TableHead>
                  <TableHead>{t("bo.role")}</TableHead>
                  <TableHead>{t("bo.status")}</TableHead>
                  <TableHead>{t("bo.joinDate")}</TableHead>
                  <TableHead>{t("bo.lastLogin")}</TableHead>
                  <TableHead className="text-right">{t("bo.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Aucun utilisateur trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(user.status)}
                          <span className="capitalize">
                            {user.status === "active" && t("bo.statusActive")}
                            {user.status === "inactive" && t("bo.statusInactive")}
                            {user.status === "suspended" && t("bo.statusSuspended")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDay(user.joinDate)}</TableCell>
                      <TableCell>{formatDay(user.lastLogin)}</TableCell>
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
                              <Link to={`/account/users/${user.id}`} className="flex items-center w-full">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Éditer</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status !== "active" ? (
                              <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                <span>{t("bo.activate")}</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleStatusChange(user.id, "inactive")}>
                                <AlertTriangle className="mr-2 h-4 w-4 text-amber-600" />
                                <span>{t("bo.deactivate")}</span>
                              </DropdownMenuItem>
                            )}
                            {user.status !== "suspended" ? (
                              <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")}>
                                <Ban className="mr-2 h-4 w-4 text-red-600" />
                                <span>{t("bo.suspend")}</span>
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(user.id)}
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

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("bo.confirmDelete")}</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible et supprimera définitivement toutes les données associées à ce compte.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AccountLayout>
  );
};

export default UserManagement;
