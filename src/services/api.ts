import { getCookie } from '../utils/cookies';

const BASE_URL = 'http://192.168.1.113:8080/api/v1';


export interface RegisterData {
  nombres: string;
  apellidos: string;
  identificacion: string;
  tipo_identificacion: 'CC' | 'CE' | 'NIT' | 'PASAPORTE';
  sexo: 'M' | 'F' | 'OTRO';
  fecha_nacimiento: string; 
  telefono: string;
  email: string;
  direccion: string;
  password: string;
  password_confirmation: string;
  terms_accepted?: boolean;
}


export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in?: number;
  user?: {
    id: number;
    name?: string;
    nombres?: string;
    apellidos?: string;
    email: string;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = data as ApiError;
    console.error('[API Error Details]:', res.status, data);
    
    if (res.status === 422 && err.errors && typeof err.errors === 'object') {
      const messages = Object.values(err.errors).flat();
      if (messages.length > 0) {
        throw new Error(messages.join('\n'));
      }
    }
    
    throw new Error(err.message ?? `Error ${res.status}`);
  }
  return data as T;
}

function authHeaders(): HeadersInit {
  const token = getCookie('access_token');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function registerCliente(data: RegisterData): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/cliente/register`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<AuthResponse>(res);
}

export async function profile(): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/cliente/profile`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<AuthResponse>(res);
}

export async function loginCliente(data: LoginData): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/cliente/login`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<AuthResponse>(res);
}

export async function refreshToken(): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/cliente/refresh`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return handleResponse<AuthResponse>(res);
}

export async function logoutCliente(): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/cliente/logout`, {
      method: 'POST',
      headers: authHeaders(),
    });
    if (!res.ok) {
      console.warn('Backend logout responded with status:', res.status);
    }
  } catch (error) {
    console.error('Backend logout request failed:', error);
  }
}

export interface PedidoData {
  cliente_id: string;
  paquete_id: string;
  fecha_inicio_plan: string;
  fecha_fin_plan: string;
}

export async function pedidos(data: PedidoData): Promise<any> {
  const res = await fetch(`${BASE_URL}/cliente/pedidos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<any>(res);
}

export async function getPedidos(): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/cliente/pedidos`, {
      method: 'GET',
      headers: authHeaders(),
    });
    return handleResponse<any>(res);
  } catch (error) {
    console.error('[API Error Details]:', error);
    throw error;
  }
}

