"use client";
import { useState } from "react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("submitting");
        setErrorMsg("");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setEmail("");
                setTimeout(() => setStatus("idle"), 4000);
            } else {
                setStatus("error");
                setErrorMsg(data.error || "Something went wrong");
                setTimeout(() => setStatus("idle"), 4000);
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please try again.");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-8 border-b border-white/10 gap-6">
            <div className="text-center md:text-left">
                <h3 className="font-bold text-xl mb-1">Newsletter</h3>
                <p className="text-sm text-gray-200">
                    Sign up with your email to join our mailing list
                </p>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full md:w-64 px-4 py-2 text-sm text-gray-800 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coffee-gold focus:border-transparent"
                    required
                    disabled={status === "submitting"}
                />
                <button
                    type="submit"
                    disabled={status === "submitting" || status === "success"}
                    className={`px-6 py-2 text-sm font-medium rounded transition-colors duration-200 whitespace-nowrap ${status === "success"
                            ? "bg-green-600 text-white"
                            : "bg-coffee-gold text-coffee-brown hover:bg-amber-400"
                        }`}
                >
                    {status === "submitting"
                        ? "Subscribing..."
                        : status === "success"
                            ? "Subscribed! ✓"
                            : "Subscribe"}
                </button>
            </form>
            {status === "error" && (
                <p className="text-red-300 text-sm mt-1">{errorMsg}</p>
            )}
        </div>
    );
}
