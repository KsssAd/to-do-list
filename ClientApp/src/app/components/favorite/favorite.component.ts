import { Component } from '@angular/core';
import { Tag, TodoList } from '../../models/to-do-list.model';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  public todoList: TodoList[] = [];
  public filteredTodoList: TodoList[] = this.todoList;
  public currTodoList: TodoList = new TodoList();
  public allTags: Tag[] = [];
  public isOpenDropDown: boolean = false;
  public selectedTag: string = "";
  public nameToFind: string = "";
  public selectedDate: string;
  public isLoading: boolean = false;

  constructor(
    private dbService: DbService,
  ) { }

  ngOnInit() {
    this.getFavoriteList();
    this.getAllTags();
  }

  getAllTags() {
    this.dbService.getAllTags().then(tags => {
      this.allTags = tags;
    });
  }

  getFavoriteList() {
    this.isLoading = true;
    this.dbService.getAllTodoLists().then(list => {
      this.todoList = list.filter(p => p.isFavorite === true);
      this.filteredTodoList = list.filter(p => p.isFavorite === true);
      this.isLoading = false;
    });
  }

  filter() {
    if (this.selectedDate != "" && this.selectedTag != "")
      this.filteredTodoList = this.todoList.filter(p => p.date.toISOString().split('T')[0] === this.selectedDate && p.tag.tagName === this.selectedTag);
    if (this.selectedDate != "")
      this.filteredTodoList = this.todoList.filter(p => p.date.toISOString().split('T')[0] === this.selectedDate);
    else
      this.filteredTodoList = this.todoList.filter(p => p.tag.tagName === this.selectedTag);
  }

  filterByName() {
    this.filteredTodoList = this.todoList.filter(p => p.name.toLowerCase().includes(this.nameToFind.toLowerCase()));
    console.info(`Выполнен поиск по имени "${this.nameToFind}".`);
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
}
