export class TodoList {
  id: string;
  name: string = "";
  isFavorite: boolean = false;
  date: Date = new Date();
  tag: Tag = new Tag();
  readyPer: number = 0;
  list: ListItem[] = [];
  user: string;
}

export class ListItem {
  id: string;
  listId: string;
  text: string = "";
  isReady: boolean = false;
}

export class Tag {
  tagName: string = "";
  color: string = "";
  user: string;
}
