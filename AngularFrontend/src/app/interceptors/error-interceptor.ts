import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorMessage } from '../models/errormessage';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar){}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      catchError(response => {
        
        const errorMessage: ErrorMessage = response.error;
        if (errorMessage.content) {

          this.snackBar.open(errorMessage.content, '', {
            duration: 5000
          });
        }

        return throwError(() => response);
      })
    );
  }
}