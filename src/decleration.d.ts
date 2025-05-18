/**
 * Type declaration for importing PNG image files in TypeScript.
 *
 * Allows TypeScript to treat `.png` imports as strings representing the file path.
 *
 * @example
 * import logo from './logo.png';
 * <img src={logo} alt="Logo" />
 */
declare module "*.png" {
  const value: string;
  export default value;
}

/**
 * Type declaration for importing CSS Modules in TypeScript.
 *
 * Allows TypeScript to understand `.module.css` imports as objects
 * where keys are class names and values are generated unique class strings.
 *
 * @example
 * import styles from './Button.module.css';
 * <button className={styles.primary}>Click me</button>
 */
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
