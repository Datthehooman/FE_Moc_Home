interface Data {
  statusCode: number;
  success: boolean;
  data: any;
}

interface AuthUser {
  user?: {
    isAdministrator?: boolean;
    [key: string]: any;
  };
  token?: {
    accessToken?: {
      token: string;
      expiresIn: string;
    };
    refreshToken?: {
      token: string;
      expiresIn: string;
    };
  };
  permissions?: string[];
  roles?: string[];
}
