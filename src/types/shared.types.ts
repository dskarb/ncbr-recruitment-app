export interface UserAuthData {
  email: string;
  password: string;
}

export interface ProfileFormValuesInterface {
  name: string;
  surname: string;
  userType: string;
  email: string;
  date: Date;
  gdpr: boolean;
}

export interface Profile {
  id: string;
  name: string;
  surname: string;
  userType: string;
  email: string;
  date: string;
  gdpr: boolean;
}
