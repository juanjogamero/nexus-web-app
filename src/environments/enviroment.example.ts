// Copia este archivo como enviroment.ts y configura la URL de tu API.
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  upload: {
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSize: 5 * 1024 * 1024
  }
};
