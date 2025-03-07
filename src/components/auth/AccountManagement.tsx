import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getCurrentUser } from "@/utils/auth";
import Navbar from "../navigation/Navbar";
import PropertyList from "../admin/PropertyList";

const AccountManagement = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = React.useState("profile");

  if (!user) {
    // Redirect to login if not authenticated
    React.useEffect(() => {
      navigate("/");
    }, [navigate]);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader className="border-b dark:border-gray-700 pb-4">
              <CardTitle className="text-2xl dark:text-white">
                Gestion du compte
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs
                defaultValue="profile"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="favorites">Favoris</TabsTrigger>
                  <TabsTrigger value="security">Sécurité</TabsTrigger>
                  {user.isStaff && (
                    <TabsTrigger value="admin">Administration</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nom d'utilisateur
                      </label>
                      <Input
                        type="text"
                        value={user.username}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        E-mail
                      </label>
                      <Input
                        type="email"
                        value={user.email}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Prénom
                      </label>
                      <Input type="text" placeholder="Entrez votre prénom" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nom
                      </label>
                      <Input type="text" placeholder="Entrez votre nom" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Numéro de téléphone
                      </label>
                      <Input
                        type="tel"
                        placeholder="Entrez votre numéro de téléphone"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Enregistrer les modifications</Button>
                  </div>
                </TabsContent>

                <TabsContent value="favorites" className="space-y-6">
                  <div className="text-center py-12 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Pas encore de favoris
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Les propriétés que vous marquez comme favorites
                      apparaîtront ici
                    </p>
                    <Button
                      onClick={() => navigate("/properties")}
                      variant="outline"
                    >
                      Parcourir les propriétés
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium dark:text-white">
                      Changer le mot de passe
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Mot de passe actuel
                        </label>
                        <Input
                          type="password"
                          placeholder="Entrez votre mot de passe actuel"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nouveau mot de passe
                        </label>
                        <Input
                          type="password"
                          placeholder="Entrez votre nouveau mot de passe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Confirmer le nouveau mot de passe
                        </label>
                        <Input
                          type="password"
                          placeholder="Confirmez votre nouveau mot de passe"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Mettre à jour le mot de passe</Button>
                    </div>
                  </div>
                </TabsContent>

                {user.isStaff && (
                  <TabsContent value="admin" className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                      <h2 className="text-xl font-semibold mb-4 dark:text-white">
                        Tableau de bord administrateur
                      </h2>
                      <PropertyList />
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
