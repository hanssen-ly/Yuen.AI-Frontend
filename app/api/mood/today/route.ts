import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const API_URL =
        process.env.BACKEND_API_URL ||
        "https://yuen-ai-backend.onrender.com";

    const token = req.headers.get("Authorization");

    if (!token) {
        return NextResponse.json(
            { message: "No token provided" },
            { status: 401 }
        );
    }

    try {
        const response = await fetch(`${API_URL}/api/mood/today`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(
                { error: error.message || "Failed to fetch mood" },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching today's mood:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
