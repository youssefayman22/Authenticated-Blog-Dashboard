
/**
 * Type declaration for importing PNG image files in TypeScript.
 *
 * This allows TypeScript to understand imports of `.png` files as modules,
 * treating them as strings representing the file path.
 *
 * @example
 * import logo from './logo.png';
 * <img src={logo} alt="Logo" />
 */

declare module "*.png" {
  const value: string;
  export default value;
}
