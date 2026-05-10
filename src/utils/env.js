export function getClientEnv(name, fallback = "") {
  return (
    import.meta.env[`VITE_${name}`] ??
    import.meta.env[`REACT_APP_${name}`] ??
    fallback
  );
}

export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
