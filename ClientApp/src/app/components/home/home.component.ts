import { Component } from '@angular/core';
import { ListItem, TodoList } from '../../models/to-do-list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public todoList: TodoList[] = [];
  public filteredTodoList: TodoList[] = this.todoList;
  public currTodoList: TodoList = new TodoList();
  public allTags: string[] = ["work", "test2", "test3"];
  public isOpenDropDown: boolean = false;
  public selectedTag: string = "";
  public nameToFind: string = "";
  public selectedDate: string;
  public favoriteCount: number = 0;
  public windowWidth: number = window.innerWidth;
  public newTag: string = "";

  ngOnInit() {
    this.getAllLists();
    this.favoriteCount = this.todoList.filter(p => p.isFavorite === true).length;
  }

  getAllLists() {
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
      isFavorite: false,
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
    console.info(`Выполнена фильтрация по тегу "${selectedTag}".`);
  }

  filterByName() {
    this.filteredTodoList = this.getCurrList().filter(p => p.name.toLowerCase() === this.nameToFind.toLowerCase());
    console.info(`Выполнен поиск по имени "${this.nameToFind}".`);
  }

  filterByDate() {
    this.filteredTodoList = this.getCurrList().filter(p => p.date.toISOString().split('T')[0] === this.selectedDate);
    console.info(`Выполнена фильтрация по дате "${this.selectedDate}".`);
  }

  getCurrList(): TodoList[] {
    return this.todoList === this.filteredTodoList ? this.todoList : this.filteredTodoList;
  }

  resetFilter() {
    this.filteredTodoList = this.todoList;
    this.selectedTag = "";
    this.nameToFind = "";
    this.selectedDate = "";
    console.info("Выполнен сброс всех фильтров.");
  }

  showTodoListModal(todoList: TodoList) {
    this.todoList = [];

    this.currTodoList = todoList;
  }

  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  addNewTag() {

  }
}
