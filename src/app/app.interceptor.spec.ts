import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Interceptor } from './app.interceptor';

describe('AppInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Interceptor
      ],
      imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const interceptor: Interceptor = TestBed.inject(Interceptor);
    expect(interceptor).toBeTruthy();
  });
});
