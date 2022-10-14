export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface Session extends Token {
  session_id: string;
}

export interface LoginSchema {
  username: string;
  password: string;
}

export interface RegisterSchema extends LoginSchema {
  name: string;
  email: string;
}
