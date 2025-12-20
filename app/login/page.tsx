"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Inbox } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth";
import { useSession } from "@/lib/contexts/session-context";
import { resolve } from "path";

export default function LoginPage(){
    const router = useRouter();
    const {checkSession} = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await loginUser(email, password);

            localStorage.setItem("token", response.token);

            await checkSession();

            await new Promise((resolve) => setTimeout(resolve, 100));

            router.push("dashboard");
        } catch(err){
            setError(
                err instanceof Error
                    ? err.message
                    : "Invalid email or password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/30">
            <Container className="flex flex-col items-center justify-center w-full">
                <Card className="w-full md:w-5/12 max-w-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-primary/10 bg-card/90 backdrop-blur-lg mt-12">
                    <div className="mb-1 text-center">
                        <h1 className="text-2xl md:text-3xl font-bold leading-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2 tracking-tight">
                            Sign In
                        </h1>
                        <p className="text-base text-muted-foreground font-medium">
                            Welcome back! Your space is waiting.
                        </p>
                    </div>

                    {/* form component */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-base font-semibold mb-2">
                                Email
                            </label>
                            <div className="relative">
                            <Inbox className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="pl-12 py-2 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder:text-muted-foreground"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-base font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="pl-12 py-2 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder:text-muted-foreground"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-500 text-base text-center font-medium">
                                {error}
                            </p>
                        )}
                        {/* Sign In Button */}
                        <Button
                            className="w-full mt-4 py-2 text-base rounded-xl font-bold bg-gradient-to-r from-primary to-primary/80 shadow-md hover:from-primary/80 hover:to-primary"
                            size="lg"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    {/* Extra Links */}
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="text-muted-foreground">
                            Don't have an account?
                        </span>
                        <Link
                            href="/signup"
                            className="text-primary font-semibold underline"
                        >
                            Sign up
                        </Link>
                        <span className="text-muted-foreground">·</span>
                        <Link href="/forgot-password" className="text-primary underline">
                            Forgot password?
                        </Link>
                    </div>
                </Card>
            </Container>
        </div>
    )
}