import { Component, ViewChild } from '@angular/core';
import { Tag, TodoList } from '../../models/to-do-list.model';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public todoList: TodoList[] = [];
  public filteredTodoList: TodoList[] = [];
  public currTodoList: TodoList = new TodoList();
  public allTags: Tag[] = [];
  public isOpenDropDown: boolean = false;
  public selectedTag: string = "";
  public nameToFind: string = "";
  public selectedDate: string;
  public favoriteCount: number = 0;
  public windowWidth: number = window.innerWidth;
  public newTag: string = "";
  public newTagColor: string = "";
  public isLoading: boolean = false;
  public isTagError: boolean = false;

  @ViewChild('addTag') addTag: HTMLDialogElement;

  constructor(
    private dbService: DbService,
  ) { }

  ngOnInit() {
    this.getAllLists();
    this.getAllTags();
  }

  getAllTags() {
    this.dbService.getAllTags().then(tags => {
      this.allTags = tags;
    });
  }

  getAllLists() {
    this.isLoading = true;
    this.dbService.getAllTodoLists().then(list => {
      this.todoList = list;
      this.filteredTodoList = list;
      this.favoriteCount = this.todoList.filter(p => p.isFavorite === true).length;
      this.isLoading = false;
    });
  }

  filterByTag(selectedTag: string) {
    this.selectedTag = selectedTag;
    this.filteredTodoList = this.getCurrList().filter(p => p.tag.tagName === selectedTag);
    console.info(`Выполнена фильтрация по тегу "${selectedTag}".`);
  }

  filterByName() {
    this.filteredTodoList = this.todoList.filter(p => p.name.toLowerCase().includes(this.nameToFind.toLowerCase()));
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
    let sameTag = this.allTags.filter(p => p.tagName.toLowerCase().trim() === this.newTag.toLowerCase().trim());

    if (sameTag.length === 0) {
      this.isTagError = false;
      this.dbService.addTag(this.newTag, this.newTagColor);
      this.getAllTags();
      this.addTag.close();
    }
    else
      this.isTagError = true;

    this.newTag = "";
    this.newTagColor = "";
  }
}
