export enum NOTIFICATIONS {
  SUCCESS_REGISTER = 'Successfully registered! Please, click Back to return on login page',
  PROVIDE_VALID_DATA_ERROR = 'Please, provide valid data',
  REQUIRED_USERNAME_ERROR = 'Username is required',
  REQUIRED_PASSWORD_ERROR = 'Password is required',
  MIN_LENTH_USERNAME_ERROR = 'Username should contain at least 3 characters',
  MIN_LENTH_PASSWORD_ERROR = 'Password should contain at least 8 characters',
  EMPTY_SPACES_ERROR = 'Prefix and postfix spaces are not allowed is username',
  UPPERCASE_PASSWROD_ERROR = 'Password should contain at least one character in lower case',
}

interface ICredentials {
  username: string;
  password: string;
}

interface IUserData {
  title: string;
  credentials: ICredentials;
  errorMessage: string;
}

export const invalidData: IUserData[] = [
  {
    credentials: { username: '', password: '' },
    title: 'Registration with empty credentials',
    errorMessage: NOTIFICATIONS.PROVIDE_VALID_DATA_ERROR,
  },
  {
    credentials: { username: '', password: 'QwertyQwerty' },
    title: 'Registration without username',
    errorMessage: NOTIFICATIONS.REQUIRED_USERNAME_ERROR,
  },
  {
    credentials: { username: 'QwertyQwerty', password: '' },
    title: 'Registration without password',
    errorMessage: NOTIFICATIONS.REQUIRED_PASSWORD_ERROR,
  },
  {
    credentials: { username: 'Q', password: 'QwertyQwerty' },
    title: 'Registration with min characters in username',
    errorMessage: NOTIFICATIONS.MIN_LENTH_USERNAME_ERROR,
  },
  {
    credentials: { username: 'Qwerty', password: 'Q' },
    title: 'Registration with min characters in password',
    errorMessage: NOTIFICATIONS.MIN_LENTH_PASSWORD_ERROR,
  },
  {
    credentials: { username: '   Qwerty', password: 'QwertyQwerty' },
    title: 'Registration with prefix/postfix spaces in username',
    errorMessage: NOTIFICATIONS.EMPTY_SPACES_ERROR,
  },
  {
    credentials: { username: 'Qwerty', password: 'QWERTYQWERTY' },
    title: 'Registration with all capital characters in password',
    errorMessage: NOTIFICATIONS.UPPERCASE_PASSWROD_ERROR,
  },
];
