export interface PasswordResetRequest {
    email: string;
  }


  export interface PasswordResetConfirmRequest {
    token: string;
    newPassword: string;
  }