import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItem, TodoList } from '../../models/to-do-list.model';

@Component({
  selector: 'add-edit-list',
  templateUrl: './add-edit-list.component.html',
  styleUrls: ['./add-edit-list.component.css']
})
export class AddEditListComponent {
  @Input() public todoList: TodoList = new TodoList;
  @Input() public isEdit: boolean = false;

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  public closeForm() {
    this.close.emit();
  }
}
