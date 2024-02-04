import { Component } from '@angular/core';
import { ListItem, TodoList } from '../../models/to-do-list.model';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  public todoList: TodoList[] = [];
  public filteredTodoList: TodoList[] = this.todoList;
  public currTodoList: TodoList = new TodoList();
  public allTags: string[] = ["work", "test2", "test3"];
  public isOpenDropDown: boolean = false;
  public selectedTag: string = "";
  public nameToFind: string = "";
  public selectedDate: string;

  ngOnInit() {
    this.getFavoriteList();
  }

  getFavoriteList() {
    let te = new TodoList;
    let item = new ListItem;
    item = { id: 1, text: "test", isReady: true };
    let item2 = new ListItem;
    item2 = { id: 2, text: "testffffffffffffffff", isReady: false };
    let item3 = new ListItem;
    item3 = { id: 3, text: "t", isReady: true };
    let test = [item, item2, item3, item2, item, item2, item];

    te = {
      name: "TEST",
      isFavorite: true,
      date: new Date(),
      tag: "work",
      readyPer: 80,
      list: test
    }

    this.todoList.push(te);

    te = {
      name: "TEST2000000000000000",
      isFavorite: true,
      date: new Date(),
      tag: "home",
      readyPer: 20,
      list: test
    }

    this.todoList.push(te);
    this.todoList.push(te);
    this.todoList.push(te);
    this.todoList.push(te);
    this.todoList.push(te);
    this.todoList.push(te);
    this.todoList.push(te);
  }

  filterByTag(selectedTag: string) {
    this.selectedTag = selectedTag;
    this.filteredTodoList = this.getCurrList().filter(p => p.tag === selectedTag);
  }

  filterByName() {
    this.filteredTodoList = this.getCurrList().filter(p => p.name.toLowerCase() === this.nameToFind.toLowerCase());
  }

  filterByDate() {
    this.filteredTodoList = this.getCurrList().filter(p => p.date.toISOString().split('T')[0] === this.selectedDate);
  }

  getCurrList(): TodoList[] {
    return this.todoList === this.filteredTodoList ? this.todoList : this.filteredTodoList;
  }

  resetFilter() {
    this.filteredTodoList = this.todoList;
    this.selectedTag = "";
    this.nameToFind = "";
    this.selectedDate = "";
  }

  showTodoListModal(todoList: TodoList) {
    this.todoList = [];

    this.currTodoList = todoList;
  }
}
