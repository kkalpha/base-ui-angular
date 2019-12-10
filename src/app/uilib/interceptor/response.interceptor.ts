import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { HandlerService } from '../services/handler.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private router: Router,
        private handlerService: HandlerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                // Succeeds when there is a response; ignore other events
                event => {
                    if (event instanceof HttpResponse && event.status === 200) {
                        const response = event.body;
                        if (response && response.statusCode === 401) {
                            this.router.navigateByUrl('passport/login');
                            if (document.getElementsByTagName('nz-modal').length > 0) {
                                document.body.removeChild(document.getElementsByTagName('nz-modal')[0]);
                            }
                            this.handlerService.handleException(401, '', 'Please log on');
                        }
                    }
                },
                // Operation failed; error is an HttpErrorResponse
                error => {
                    // TODO
                }
            ),
            finalize(() => {
                // TODO
            })
        );
    }
}
