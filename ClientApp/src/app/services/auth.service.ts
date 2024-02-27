import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieOptions, CookieService } from "ngx-cookie";

@Injectable()
export class AuthService {
  private options: CookieOptions;
  private _currentUser: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    this.options = {
      expires: today
    }
    this._currentUser = "";
  }

  //Признак авторизации пользователя в проекте
  get isLoggedIn(): boolean {
    let currentUserInCookie = this.cookieGetByKey("currentUser_TodoList");

    if (currentUserInCookie) {
      return true;
    }
    else {
      if (this.router.url !== '/login') {
        this.router.navigateByUrl('/login');
      }
      return false;
    }
    return false;
  }

  //Установить текущего пользователя
  public set currentUser(value: string) {
    this._currentUser = value;
    let json = JSON.stringify(value);
    this.cookiePut("currentUser_TodoList", json);
  }

  //Получить текущего пользователя
  public get currentUser(): string {
    let currentUserInCookie = this.cookieGetByKey("currentUser_TodoList");
    if (currentUserInCookie)
      this._currentUser = JSON.parse(currentUserInCookie);
    else
      this._currentUser = "";

    return this._currentUser;
  }

  //Добавить куки
  public cookiePut(key: string, value: string) {
    this.cookieService.put(key, value, this.options);
  }

  //Получить куки по ключу
  public cookieGetByKey(key: string) {
    let result = this.cookieService.get(key);
    return result;
  }

  //Очистить куки
  public removeCookie() {
    this.cookieService.remove("currentUser_TodoList");
  }
}
