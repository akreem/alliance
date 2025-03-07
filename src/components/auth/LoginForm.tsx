import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { loginUser } from "@/services/api";

interface LoginFormProps {
  onSuccess?: () => void;
  onSignupClick?: () => void;
  isDialog?: boolean;
}

const LoginForm = ({
  onSuccess,
  onSignupClick,
  isDialog = false,
}: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await loginUser(username, password);
      if (user && user.token) {
        // Store token in localStorage
        localStorage.setItem("authToken", user.token);
        localStorage.setItem("user", JSON.stringify(user));

        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Nom d'utilisateur
        </label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Entrez votre nom d'utilisateur"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Mot de passe
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Entrez votre mot de passe"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );

  if (isDialog) {
    return (
      <div className="space-y-4">
        {formContent}
        {onSignupClick && (
          <p className="text-sm text-center text-gray-500 pt-4">
            Vous n'avez pas de compte ?{" "}
            <button
              type="button"
              onClick={onSignupClick}
              className="text-primary hover:underline"
            >
              S'inscrire
            </button>
          </p>
        )}
      </div>
    );
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Bienvenue</CardTitle>
        <CardDescription>Connectez-vous à votre compte</CardDescription>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Vous n'avez pas de compte ?{" "}
          <button
            type="button"
            onClick={onSignupClick}
            className="text-primary hover:underline"
          >
            S'inscrire
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
