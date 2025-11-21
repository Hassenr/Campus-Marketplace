"use client";
import React, { useState } from "react";
import { login, register } from '@/src/lib/api/auth';
import { useRouter } from 'next/navigation';

type Mode = "signin" | "signup";

export default function AuthPage() {
    const router = useRouter();
    const [mode, setMode] = useState<Mode>("signin");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [college, setCollege] = useState("");

    const switchMode = (m: Mode) => {
        setError(null);
        setMode(m);
        setEmail(''); setPassword(''); setUsername(''); setConfirmPassword(''); setCollege('');
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (mode === "signup") {
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }
        }

        setLoading(true);
        try {
            if (mode === "signin") {
                await login({
                    username,
                    password
                });
            } else {
                await register({
                    username,
                    email,
                    password,
                    college
                });
            }

            // Redirect to home or dashboard on success
            router.push('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ width: "100%", maxWidth: 880, display: "flex", gap: 24, alignItems: "stretch" }}>
                {/* Left: informational / consistent with Home style */}
                <section
                    aria-hidden
                    style={{
                        flex: 1,
                        padding: 28,
                        borderRadius: 12,
                        background: "#f5f7fb",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 12,
                    }}
                >
                    <h1 style={{ margin: 0, fontSize: 28 }}>Campus Marketplace</h1>
                    <p style={{ margin: 0, color: "#444" }}>
                        {mode === "signin"
                            ? "Welcome back! Sign in to access your listings and messages."
                            : "Create an account to start buying and selling on campus."}
                    </p>
                    <ul style={{ marginTop: 12, paddingLeft: 18, color: "#555" }}>
                        <li>Quick listings</li>
                        <li>Private messaging</li>
                        <li>Student-only community</li>
                    </ul>
                </section>

                {/* Right: auth card */}
                <section
                    style={{
                        width: 420,
                        padding: 28,
                        borderRadius: 12,
                        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                        background: "#fff",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                        <h2 style={{ margin: 0 }}>{mode === "signin" ? "Sign in" : "Create account"}</h2>
                        <div style={{ fontSize: 13, color: "#666" }}>
                            <button
                                onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    color: "#2563eb",
                                    cursor: "pointer",
                                    padding: 6,
                                }}
                                aria-label="Switch sign in sign up"
                            >
                                {mode === "signin" ? "Need an account?" : "Have an account?"}
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {mode === "signup" && (
                            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <span style={{ fontSize: 13, color: "#333" }}>Username</span>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Your username"
                                    required
                                    style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
                                />
                            </label>
                        )}

                        {mode === "signin" && (
                            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <span style={{ fontSize: 13, color: "#333" }}>Username</span>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Your username"
                                    required
                                    style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
                                />
                            </label>
                        )}

                        {mode === "signup" && (
                            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <span style={{ fontSize: 13, color: "#333" }}>Email</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@school.edu"
                                    required
                                    style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
                                />
                            </label>
                        )}

                        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <span style={{ fontSize: 13, color: "#333" }}>Password</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
                            />
                        </label>

                        {mode === "signup" && (
                            <>
                                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    <span style={{ fontSize: 13, color: "#333" }}>Confirm password</span>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Repeat password"
                                        required
                                        style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
                                    />
                                </label>

                                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    <span style={{ fontSize: 13, color: "#333" }}>College</span>
                                    <input
                                        value={college}
                                        onChange={(e) => setCollege(e.target.value)}
                                        placeholder="Your college name"
                                        required
                                        style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
                                    />
                                </label>
                            </>
                        )}

                        {error && <div style={{ color: "crimson", fontSize: 13 }}>{error}</div>}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                marginTop: 6,
                                padding: "10px 12px",
                                borderRadius: 8,
                                background: "#2563eb",
                                color: "#fff",
                                border: "none",
                                cursor: loading ? "default" : "pointer",
                            }}
                        >
                            {loading ? "Working..." : mode === "signin" ? "Sign in" : "Create account"}
                        </button>

                        <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
                            {/* Placeholder for third-party auth or password reset */}
                            <button
                                type="button"
                                onClick={() => {
                                    // TODO: wire up password reset flow
                                    alert("Password reset flow (stub)");
                                }}
                                style={{ background: "transparent", border: "none", color: "#2563eb", cursor: "pointer", padding: 0 }}
                            >
                                Forgot password?
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}