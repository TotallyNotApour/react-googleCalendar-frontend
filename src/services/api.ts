const API_URL = "http://localhost:5000";

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

export async function apiFetch(path: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
            ...options.headers,
        },
    });
    
    if (!response.ok) {
        throw new ApiError("API request failed", response.status);
    }
    console.log("API response:", await response.clone().json());
    return response.json();
}
