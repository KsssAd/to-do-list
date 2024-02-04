import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(
    public router: Router
  ) { }

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
}
