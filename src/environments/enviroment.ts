/**
 * La muestra pública funciona sin backend. Para conectar una API real,
 * establece demoMode=false y configura apiUrl con tu propio servidor.
 * No almacenes secretos en este archivo: se incluye en el bundle cliente.
 */
export const environment = {
  production: false,
  demoMode: true,
  apiUrl: 'http://localhost:8080',
  upload: {
    maxFileSize: 5 * 1024 * 1024,
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp']
  }
};
