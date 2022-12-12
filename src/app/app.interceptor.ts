import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpErrorResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AdminService } from './services/admin.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
	constructor(
		private readonly router: Router,
		private readonly adminService: AdminService,
	) {}

	private readonly baseUrl: string = environment.apiURL


	intercept(request: HttpRequest<any>, next: HttpHandler) {
		if (request.url.includes('assets')) return next.handle(request);
		
		const token = this.adminService.token();

    
		const requestClone = request.clone({
			// setHeaders: { Authorization: `Bearer ${token}` },
			url: `${request.url}`,
		});

    // console.log(token)
    // console.log(requestClone.headers)
    // console.log(requestClone.url)
    // console.log(requestClone)

		return next
			.handle(requestClone)
			.pipe(tap(null, error => this.handleError(error)));
	}

	handleError(err: HttpErrorResponse) {
		switch (err.status) {
			case 408:
				console.error(`Server was disconnected unexpectedly.`);
				break;
			default:
				console.log('Outro erro: ', err.message);
		}
	}
}