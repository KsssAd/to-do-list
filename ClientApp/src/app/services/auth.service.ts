import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
  ) { }

  get isLoggedIn(): boolean {

    if (this.router.url !== '/login') {
      return true;
    }
    return false;

//TODO LOGIN

    //if (currentUserInCookie) {
    //  return true;
    //} else {
    //  //делаем также редирект на форму логина (фикс проблемы, если куки умерли - пропадает все меню и кнопки)
    //  if (this.router.url !== '/login') {
    //    this.router.navigateByUrl('/login');
    //  }
    //  return false;
    //}
  }
}
