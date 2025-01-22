export interface JwtPayload {
  name: string;
  clientId: number;
  sub: number;
  role: string;
}

export interface ILoggedUserInfo {
  id: number;
  email: string;
  name: string;
  clientId: number;
  role: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}
