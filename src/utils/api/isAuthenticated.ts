import { cookies } from 'next/headers';

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const session_token = cookieStore.get('session_token');
  if (!session_token) {
    return false;
  }

  return true;
}
