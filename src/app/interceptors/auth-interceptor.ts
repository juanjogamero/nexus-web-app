import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';
import { environment } from '../../environments/enviroment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    // Evita adjuntar tokens a imágenes, tiendas u otros dominios externos.
    const belongsToApi = request.url.startsWith(environment.apiUrl.replace(/\/$/, '') + '/');
    const authenticatedRequest = token && belongsToApi
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;
    return next.handle(authenticatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && belongsToApi) this.authService.logout();
        return throwError(() => error);
      })
    );
  }
}
