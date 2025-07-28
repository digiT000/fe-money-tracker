export function getAccessToken() {
  try {
    return localStorage.getItem('accessToken');
  } catch (error) {
    console.error('Could not retrieve access token from localStorage:', error);
    return null;
  }
}
