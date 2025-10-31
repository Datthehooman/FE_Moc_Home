interface UserData {
  user_id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthUser {
  user?: UserData;
  access_token?: string;
}

interface ApiAuthResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}
