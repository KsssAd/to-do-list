import { Injectable } from "@angular/core";
import { TodoList } from "../models/to-do-list.model";

@Injectable()

export class GeneralFunctionsService {

  calcPerReady(todoList: TodoList): number {
    let allCount = todoList.list.length;
    let readyCount = todoList.list.filter(p => p.isReady === true).length;

    return Math.round(readyCount * 100 / allCount);
  }
}
