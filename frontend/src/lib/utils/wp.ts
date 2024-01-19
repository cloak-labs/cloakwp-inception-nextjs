import { getCMSInstance } from 'cloakwp';

/**
 * This simply provides a way to call `getCMSInstance` once, and act as a shortcut
 * for accessing your default WordPress instance object; it's also nice to name
 * it something short and intuitive like `wp` so you aren't always dealing with
 * `getCMSInstance`.
 */
export const wp = getCMSInstance();
