// Copia de configuración para conectar un backend propio. No incluyas secretos.
export const environment = {
  production: false,
  demoMode: true,
  apiUrl: 'http://localhost:8080',
  upload: {
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSize: 5 * 1024 * 1024
  }
};
