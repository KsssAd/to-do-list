import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItem, TodoList } from '../../models/to-do-list.model';

@Component({
  selector: 'add-edit-list',
  templateUrl: './add-edit-list.component.html',
  styleUrls: ['./add-edit-list.component.css', '../list-card/list-card.component.css']
})
export class AddEditListComponent {
  @Input() public todoList: TodoList = new TodoList;
  @Input() public isEdit: boolean = false;

  @Output() close: EventEmitter<any> = new EventEmitter();

  public allTags: string[] = ["test1", "test2", "test3"];
  public isOpenDropDown: boolean = false;
  public newTag: string = "";
  public newItemText: string = "";
  public date: Date = this.todoList.date;

  constructor() { }

  public closeForm() {
    this.close.emit();
  }

  tagClick(tagName: string) {
    this.todoList.tag = tagName;
    this.isOpenDropDown = false;
  }

  addNewTag() {

  }

  addNewTodoListItem() {
    let newItem = new ListItem();
    newItem.text = this.newItemText;
    this.todoList.list.push(newItem);
    this.newItemText = "";
  }

  isValid(): boolean {
    if ((this.todoList.name != null
        && this.todoList.name != "")
      && this.todoList.date != null
      && (this.todoList.tag != null
        && this.todoList.tag != ""))
      return true;
    else return false;
  }

  save() {
    this.todoList.readyPer = this.calcPerReady();

    this.closeForm();
  }

  calcPerReady(): number {
    let allCount = this.todoList.list.length;
    let readyCount = this.todoList.list.filter(p => p.isReady === true).length;

    return Math.round(readyCount * 100 / allCount);
  }
}
