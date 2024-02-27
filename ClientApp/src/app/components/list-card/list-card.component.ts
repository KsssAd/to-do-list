import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItem, TodoList } from '../../models/to-do-list.model';
import { GeneralFunctionsService } from '../../services/general-functions.service';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent {
  @Input() public todoList: TodoList = new TodoList();

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    private dbService: DbService,
    private gFuncService: GeneralFunctionsService,
  ) { }

  markAsReady(item: ListItem) {
    this.todoList.readyPer = this.gFuncService.calcPerReady(this.todoList);
    this.dbService.checkReady(item);
    this.dbService.editReadyPer(this.todoList);
  }

  deleteList() {
    this.dbService.deleteList(this.todoList.id);
    this.close.emit(); 
  }
}
