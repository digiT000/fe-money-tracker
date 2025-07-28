export function saveAccessToken(token: string) {
  if (!token) {
    console.error('Invalid token provided to saveAccessToken');
    return;
  }
  try {
    localStorage.setItem('accessToken', token);
  } catch (error) {
    console.error('Could not save access token to localStorage:', error);
  }
}
