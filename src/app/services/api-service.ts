import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';

export interface RequestSettings {
  throw404Errors: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) { }

  public async get<T>(
    url: string,
    params: object = {},
    settings?: RequestSettings
  ): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.get<T>(
        `${environment.apiUrl}/${url}`,
        this.getOptions(params)
      ),
      settings
    );
  }

  public async post<T>(
    url: string,
    params: object = {},
    settings?: RequestSettings
  ): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.post<T>(
        `${environment.apiUrl}/${url}`,
        params,
        this.getOptions()
      ),
      settings
    );
  }

  public async put<T>(
    url: string,
    params: object = {},
    settings?: RequestSettings
  ): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.put<T>(
        `${environment.apiUrl}/${url}`,
        params,
        this.getOptions()
      ),
      settings
    );
  }

  public async patch<T>(
    url: string,
    params: object = {},
    settings?: RequestSettings
  ): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.patch<T>(
        `${environment.apiUrl}/${url}`,
        params,
        this.getOptions()
      ),
      settings
    );
  }

  public async delete<T>(
    url: string,
    params: object = {},
    settings?: RequestSettings
  ): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.delete<T>(
        `${environment.apiUrl}/${url}`,
        this.getOptions(params)
      ),
      settings
    );
  }

  private async parseRequest<T>(
    request: Observable<T>,
    settings?: RequestSettings
  ): Promise<any> {
    return request
      .toPromise()
      .then((success: T) => success)
      .catch((error: HttpErrorResponse) => this.errorResponse(error, settings));
  }

  private getOptions(params: object = {}, body: object = {}): object {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    let token = this.authService.token;

    if (token) { 
      headers['Authorization'] = `Bearer ${token}`;
    }

    return {
      headers,
      params,
      body,
    };
  }

  private errorResponse(
    response: HttpErrorResponse,
    settings: RequestSettings = { throw404Errors: true }
  ): null {
    switch (response.status) {
      case 401: {
        this.safeNavigateTo('');
        break;
      }
      case 403: {
        this.safeNavigateTo('');
        break;
      }
      case 404: {
        if (settings?.throw404Errors) throw response.error;
        this.safeNavigateTo('');
        break;
      }
      case 422: {
        throw response.error;
      }
      default: {
        this.safeNavigateTo('');
        break;
      }
    }

    throw new Error('error');
  }

  private safeNavigateTo(route: string): void {
    setTimeout(() => {
      const currentPath = this.router.url.split('/')[1];
      if (currentPath !== route) {
        void this.router.navigateByUrl(route);
      }
    });
  }
}
