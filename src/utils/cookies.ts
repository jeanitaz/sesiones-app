/**
 * Utility functions for handling cookies in the browser.
 */

export function setCookie(name: string, value: string, days?: number): void {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  // Secure by default, SameSite=Lax for normal SPA behavior
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax; Secure`;
}

export function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

export function eraseCookie(name: string): void {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure`;
}
