// AUTH REQUESTS
export interface AuthenticationRequest {
    email: string,
    password: string,
}

export interface RegistrationRequest {
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
    profilePhotoUrl: string;
    username: string;
}


//AUTH RESPONSES

export interface AuthenticationResponse{
    token?: string;
}

interface User {
    id: number;
    name: string;
    surname: string;
    username: string;
    profilePhotoUrl: string;
}