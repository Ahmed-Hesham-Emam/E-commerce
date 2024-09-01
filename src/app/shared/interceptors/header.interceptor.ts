import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage != 'undefined') {
    let userTokenHeader = {
      token: localStorage.getItem('userToken')!,
    };

    req = req.clone({
      setHeaders: userTokenHeader,
    });
  }
  return next(req);
};
