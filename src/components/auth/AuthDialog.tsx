import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "signup";
  onSuccess?: () => void;
}

const AuthDialog = ({
  open,
  onOpenChange,
  defaultTab = "login",
  onSuccess,
}: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  
  // Update activeTab when defaultTab prop changes
  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // Update activeTab when dialog opens
  useEffect(() => {
    if (open && defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [open, defaultTab]);

  const handleSuccess = () => {
    onOpenChange(false);
    // Call the onSuccess callback if provided
    if (onSuccess) {
      onSuccess();
    } else {
      // Otherwise, force a page refresh to update the navbar
      window.location.reload();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === "login" ? "Bienvenue" : "Créer un compte"}
          </DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onSuccess={handleSuccess} isDialog={true} />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm onSuccess={handleSuccess} isDialog={true} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
