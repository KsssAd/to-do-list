import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { DbService } from "../../services/db.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public loginName: string = "";
  public password: string = "";
  public errorMessageLogin: string = "";
  public errorMessageRegister: string = "";

  constructor(
    public router: Router,
    private authService: AuthService,
    private dbService: DbService,
  ) {
    this.authService.removeCookie();
  }

  ngOnInit() {
    console.info(`
      Добро пожаловать в веб-приложение "TO-DO LIST"!

      Данное приложение выполняет функции планировщика списка дел, позволяет создавать, редактировать и
    удалять ваши списки, а так же распределять их по датам в календаре и добавлять в избранное.
    Для создания списка вам необходимо указать его название, выбрать дату, выбрать тег из уже существующих
    или добавить новый, добавить сами задачи в список и, если необходимо, пометить список как избранный.
      Для просмотра всех избранных списков воспользуйтесь вкладкой "Избранное", на которой предоставлены
    инструменты для дополнительной фильтрации и удобного поиска.
      Для просмотра запланированных на определенные даты списков воспользуйтесь вкладкой "Календарь".
      Графический пользовательский интерфейс приложения "TO-DO LIST" разработан в стиле "Неомофизм"
    (Неомофизм - это стиль дизайна пользовательского интерфейса, который легко узнается по своему рельефному
    эффекту: за счет мягких теней от элементов они кажутся выпуклыми или, наоборот, вдавленными.)
    `);
  }

  login() {
    this.errorMessageLogin = "";
    let emailInput = document.getElementById("email");

    if (this.loginName !== "" && this.password !== "") {
      if (emailInput?.classList.contains("ng-valid")) {
        this.dbService.login(this.loginName, this.password).then(user => {
          if (user != null) {
            this.authService.currentUser = user;
            this.router.navigateByUrl('/');
            console.info(`Выполнен вход под пользователем ${user}.`);
          }
          else this.errorMessageLogin = "Неправильно введен логин или пароль!";
        });
      }
      else this.errorMessageLogin = "Логин должен соответствовать адресу почтового ящика!";
    }
    else this.errorMessageLogin = "Заполните все поля!";
  }

  registration() {
    this.errorMessageRegister = "";
    let emailInput = document.getElementById("email2");

    if (this.loginName !== "" && this.password !== "") {
      if (emailInput?.classList.contains("ng-valid")) {
        if (this.dbService.isExistUser(this.loginName) === false) {
          this.dbService.registration(this.loginName, this.password).then(user => {
            this.authService.currentUser = user;
            this.router.navigateByUrl('/');
            console.info(`Выполнена регистрация пользователя ${user}.`);
            console.info(`Выполнен вход под пользователем ${user}.`);
          });
        }
        else this.errorMessageRegister = "Такой пользователь уже существует в системе!";
      }
      else this.errorMessageRegister = "Логин должен соответствовать адресу почтового ящика!";
    }
    else this.errorMessageRegister = "Заполните все поля!";
  }
}
