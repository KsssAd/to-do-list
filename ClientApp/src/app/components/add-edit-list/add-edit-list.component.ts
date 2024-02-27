import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ListItem, Tag, TodoList } from '../../models/to-do-list.model';
import { DbService } from '../../services/db.service';
import { GeneralFunctionsService } from '../../services/general-functions.service';

@Component({
  selector: 'add-edit-list',
  templateUrl: './add-edit-list.component.html',
  styleUrls: ['./add-edit-list.component.css', '../list-card/list-card.component.css']
})
export class AddEditListComponent {
  @Input() public todoList: TodoList = new TodoList();
  @Input() public isEdit: boolean = false;

  @Output() close: EventEmitter<any> = new EventEmitter();

  @ViewChild('addTag') addTag: HTMLDialogElement;

  public allTags: Tag[] = [];
  public isOpenDropDown: boolean = false;
  public newTag: string = "";
  public newTagColor: string = "";
  public newItemText: string = "";
  public isTagError: boolean = false;

  constructor(
    private dbService: DbService,
    private gFuncService: GeneralFunctionsService,
  ) { }

  ngOnInit() {
    this.getAllTags();
  }

  getAllTags() {
    this.dbService.getAllTags().then(tags => {
      this.allTags = tags;
    });
  }

  closeForm() {
    this.close.emit();
  }

  changeDate(e: any) {
    this.todoList.date = e.currentTarget.valueAsDate;
  }

  tagClick(tag: Tag) {
    this.todoList.tag = tag;
    this.isOpenDropDown = false;
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

  addNewItem() {
    let newItem = new ListItem();
    newItem.text = this.newItemText;
    this.todoList.list.push(newItem);
    this.newItemText = "";
  }

  deleteItem(id: string) {
    this.dbService.deleteItem(id);
    let index = this.todoList.list.findIndex(p => p.id === id);
    this.todoList.list.splice(index, 1);
  }

  isValid(): boolean {
    if ((this.todoList.name != null
        && this.todoList.name != "")
      && this.todoList.date != null
      && (this.todoList.tag != null
        && this.todoList.tag.tagName != ""))
      return true;
    else return false;
  }

  save() {
    this.todoList.readyPer = this.gFuncService.calcPerReady(this.todoList);
    if (this.isEdit)
      this.dbService.editList(this.todoList);
    else
      this.dbService.addNewList(this.todoList, this.todoList.list);
    this.closeForm();
  }

  markAsReady(item: ListItem) {
    this.todoList.readyPer = this.gFuncService.calcPerReady(this.todoList);
    this.dbService.checkReady(item);
    this.dbService.editReadyPer(this.todoList);
  }
}
