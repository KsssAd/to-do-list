export class TodoList {
  name: string = "";
  isFavorite: boolean = false;
  date: Date = new Date();
  tag: string = "";
  readyPer: number = 0;
  list: ListItem[] = [];
}

export class ListItem {
  id: number = 0;
  text: string = "";
  isReady: boolean = false;
}
