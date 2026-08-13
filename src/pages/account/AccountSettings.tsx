import { useState } from "react";
import { User, Mail, Phone, MapPin, Bell, Lock, Save } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const AccountSettings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "06 12 34 56 78",
    address: "123 Avenue des Entrepreneurs",
    city: "Paris",
    postalCode: "75001",
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    newRental: true,
    messages: true,
    promotions: false,
  });
  
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  
  const handleProfileSave = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };
  
  const handleNotificationsSave = () => {
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences de notification ont été mises à jour.",
    });
  };
  
  const handlePasswordSave = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
    });
    
    setPasswords({ current: "", new: "", confirm: "" });
  };
  
  return (
    <AccountLayout title={t("bo.accountSettings")}>
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">{t("set.profile")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("set.notifications")}</TabsTrigger>
          <TabsTrigger value="security">{t("set.security")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                {t("set.personalInfo")}
              </CardTitle>
              <CardDescription>
                {t("set.personalInfoDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.fullName")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("contact.phone")}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">{t("set.address")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="address" 
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">{t("checkout.city")}</Label>
                  <Input 
                    id="city" 
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postalCode">{t("checkout.postalCode")}</Label>
                  <Input 
                    id="postalCode" 
                    value={profile.postalCode}
                    onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                  />
                </div>
              </div>
              
              <Button onClick={handleProfileSave}>
                <Save className="mr-2 h-4 w-4" />
                {t("set.saveChanges")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                {t("set.notifPrefs")}
              </CardTitle>
              <CardDescription>
                {t("set.notifPrefsDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t("set.emailNotif")}</p>
                    <p className="text-sm text-muted-foreground">{t("set.emailNotifDesc")}</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t("set.smsNotif")}</p>
                    <p className="text-sm text-muted-foreground">{t("set.smsNotifDesc")}</p>
                  </div>
                  <Switch 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t("set.newRentals")}</p>
                    <p className="text-sm text-muted-foreground">{t("set.newRentalsDesc")}</p>
                  </div>
                  <Switch 
                    checked={notifications.newRental}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newRental: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t("set.messages")}</p>
                    <p className="text-sm text-muted-foreground">{t("set.messagesDesc")}</p>
                  </div>
                  <Switch 
                    checked={notifications.messages}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t("set.promos")}</p>
                    <p className="text-sm text-muted-foreground">{t("set.promosDesc")}</p>
                  </div>
                  <Switch 
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                  />
                </div>
              </div>
              
              <Button onClick={handleNotificationsSave}>
                <Save className="mr-2 h-4 w-4" />
                {t("set.savePrefs")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5 text-primary" />
                {t("set.accountSecurity")}
              </CardTitle>
              <CardDescription>
                {t("set.changePasswordDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t("set.currentPassword")}</Label>
                  <Input 
                    id="currentPassword" 
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t("set.newPassword")}</Label>
                  <Input 
                    id="newPassword" 
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  />
                </div>
              </div>
              
              <Button onClick={handlePasswordSave}>
                <Lock className="mr-2 h-4 w-4" />
                {t("set.changePassword")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AccountLayout>
  );
};

export default AccountSettings;
