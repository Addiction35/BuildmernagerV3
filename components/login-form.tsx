"use client";

import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/app/context/authContext";
import { Eye, EyeOff } from "lucide-react"; // 👈 Added icons
import axiosInstance from "@/lib/axios";

interface LoginFormProps extends React.ComponentProps<"div"> {
  className?: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth() || { login: () => {} };
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // 👈 New state for toggle

  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

const loginMutation = useMutation({
  mutationFn: async (data: LoginFormData) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },
onSuccess: (data) => {
  console.log(data);
  // Save user only (no token needed for session)
  login(data.user); 

  toast({ title: "Login successful", description: "Redirecting..." });
  router.push('/');
},
  onError: (error: any) => {
    setAuthError(error.response?.data?.message || 'Login failed');
    toast({
      title: 'Login failed',
      description: error.response?.data?.message || 'Unable to authenticate',
      variant: 'destructive',
    });
  },
});



  const onSubmit = (data: LoginFormData) => {
    setAuthError(null);
    loginMutation.mutate(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">Login to your Studio1:1 account</p>
              </div>

              {authError && (
                <Alert variant="destructive">
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                  Email
                </Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      className={errors.email ? "border-destructive" : ""}
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>
                    Password
                  </Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"} // 👈 Toggle visibility
                        className={errors.password ? "border-destructive pr-10" : "pr-10"}
                        {...field}
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
