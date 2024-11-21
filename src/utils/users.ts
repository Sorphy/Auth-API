export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  otp?: number;
  otpExpiry?: Date;
  verified?: boolean;
}

export const users: User[] = [];
