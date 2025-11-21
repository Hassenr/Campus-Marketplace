// API functions for authentication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    college: string;
}

export interface AuthResponse {
    token: string;
    username: string;
    email: string;
    college: string;
}


export async function login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data: AuthResponse = await response.json();

    // Save JWT token and user data to localStorage
    if (data.token) {
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user', JSON.stringify({
            username: data.username,
            email: data.email,
            college: data.college,
        }));
    }

    return data;
}

export async function register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    const data: AuthResponse = await response.json();

    // Save JWT token and user data to localStorage
    if (data.token) {
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user', JSON.stringify({
            username: data.username,
            email: data.email,
            college: data.college,
        }));
    }

    return data;
}

export function getUser(): { username: string; email: string; college: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
}

export function getToken(): string | null {
    return localStorage.getItem('jwt_token');
}

export function isAuthenticated(): boolean {
    return !!getToken();
}
