import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItem, TodoList } from '../../models/to-do-list.model';

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent {
  @Input() public todoList: TodoList = new TodoList();
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  public closeForm() {
    this.close.emit(); 
  }

}
