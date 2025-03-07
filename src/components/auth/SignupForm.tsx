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
import { registerUser } from "@/services/api";

interface SignupFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
  isDialog?: boolean;
}

const SignupForm = ({
  onSuccess,
  onLoginClick,
  isDialog = false,
}: SignupFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const user = await registerUser(username, email, password);
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
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Choose a username"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Create a password"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm your password"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>
    </form>
  );

  if (isDialog) {
    return (
      <div className="space-y-4">
        {formContent}
        {onLoginClick && (
          <p className="text-sm text-center text-gray-500 pt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLoginClick}
              className="text-primary hover:underline"
            >
              Log in
            </button>
          </p>
        )}
      </div>
    );
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Sign up to access exclusive features</CardDescription>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onLoginClick}
            className="text-primary hover:underline"
          >
            Log in
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
