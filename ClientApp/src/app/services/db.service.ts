import { Injectable } from "@angular/core";
import {
  collection, addDoc, getFirestore, Firestore,
  deleteDoc, doc, getDocs, getDoc, updateDoc,
  query, where, CollectionReference, DocumentData,
  limit
} from "firebase/firestore";
import { ListItem, Tag, TodoList } from "../models/to-do-list.model";
import { app } from "../app.module";
import { AuthService } from "./auth.service";

@Injectable()

export class DbService {
  db: Firestore;
  users: CollectionReference<DocumentData, DocumentData>;
  lists: CollectionReference<DocumentData, DocumentData>;
  tags: CollectionReference<DocumentData, DocumentData>;
  items: CollectionReference<DocumentData, DocumentData>;

  constructor(
    private authService: AuthService,
  ) {
    this.db = getFirestore(app);
    this.users = collection(this.db, "Users");
    this.lists = collection(this.db, "ToDoLists");
    this.tags = collection(this.db, "Tags");
    this.items = collection(this.db, "ToDoItems");
  }

  //Получить все списки дел для пользователя
  async getAllTodoLists() {
    let todoLists: TodoList[] = [];
    let user = this.authService.currentUser;
    let todoListsSnapshot = await getDocs(query(this.lists, where("user", "==", user)));

    todoListsSnapshot.forEach(doc => {
      let data = doc.data();
      let todoList = new TodoList();

      todoList.id = data.id;
      todoList.name = data.name;
      todoList.isFavorite = data.isFavorite;
      todoList.date = new Date(data.date.seconds * 1000);
      todoList.readyPer = data.readyPer;

      let tag = new Tag();
      tag.color = data.tag.color;
      tag.tagName = data.tag.tagName;
      todoList.tag = tag;

      this.getListItems(todoList.id).then(items => todoList.list = items);

      todoLists.push(todoList);
    });

    return todoLists;
  }

  //Добавить новый список дел
  async addNewList(list: TodoList, itemsList: ListItem[]) {
    let user = this.authService.currentUser;
    let newList = await addDoc(this.lists, {
      name: list.name,
      isFavorite: list.isFavorite,
      date: list.date,
      tag: {
        tagName: list.tag.tagName,
        color: list.tag.color,
      },
      readyPer: list.readyPer,
      user: user,
    });

    itemsList.forEach(item => this.addNewItem(item, newList.id));

    updateDoc(newList, { id: newList.id });
  }

  //Редактирование списка дел
  editList(list: TodoList) {
    updateDoc(doc(this.db, "ToDoLists", list.id), {
      name: list.name,
      isFavorite: list.isFavorite,
      date: list.date,
      tag: {
        tagName: list.tag.tagName,
        color: list.tag.color,
      },
      readyPer: list.readyPer,
    }); 
  }

  //Получить информацию о списке дел
  async getTodoInfo(id: string) {
    let todoList = await getDoc(doc(this.db, "ToDoLists", id));

    const data = todoList.data();
    const result = new TodoList();
    result.name = data?.name;
    result.isFavorite = data?.isFavorite;
    result.date = data?.date;
    result.readyPer = data?.readyPer;

    let tag = new Tag();
    tag.color = data?.tag.color;
    tag.tagName = data?.tag.tagName;
    result.tag = tag;

    return todoList;
  }

  //Удалить список дел
  deleteList(id: string) {
    this.deleteItemsWithList(id);
    deleteDoc(doc(this.db, "ToDoLists", id));
  }

  //Обновление процента выполнения
  editReadyPer(list: TodoList) {
    updateDoc(doc(this.db, "ToDoLists", list.id), {
      readyPer: list.readyPer
    });
  }

  //--------------------------------------------------------------------//

  //Добавить новый пункт
  async addNewItem(item: ListItem, listId: string) {
    let newItem = await addDoc(this.items, {
      listId: listId,
      text: item.text,
      isReady: item.isReady
    });

    updateDoc(newItem, { id: newItem.id });
  }

  //Получить все пункты списка
  async getListItems(idList: string) {
    const items: ListItem[] = [];
    let itemsSnapshot = await getDocs(query(this.items, where("listId", "==", idList)));

    itemsSnapshot.forEach(doc => {
      const data = doc.data();
      const listItem = new ListItem();
      listItem.id = data.id;
      listItem.isReady = data.isReady;
      listItem.listId = data.listId;
      listItem.text = data.text;
      items.push(listItem);
    });

    return items;
  }

  //Удалить пункт списка
  deleteItem(id: string) {
    deleteDoc(doc(this.db, "ToDoItems", id));
  }

  //Удаление пунктов списка при удалении самого списка
  deleteItemsWithList(listId: string) {
    this.getListItems(listId).then(itemsList => {
      itemsList.forEach(item => {
        deleteDoc(doc(this.db, "ToDoItems", item.id));
      })
    });
  }

  //Отметить пункт
  checkReady(item: ListItem) {
    updateDoc(doc(this.db, "ToDoItems", item.id), {
      isReady: item.isReady
    });
  }

  //--------------------------------------------------------------------//



  //Добавление тега
  async addTag(tag: string, color: string) {
    let newItem = await addDoc(this.tags, {
      tagName: tag,
      color: color,
      user: this.authService.currentUser,
    });

    updateDoc(newItem, { id: newItem.id });
  }

  //Получение всех тегов
  async getAllTags() {
    let user = this.authService.currentUser;
    let tags = await getDocs(query(this.tags, where("user", "==", user)));

    let result: Tag[] = [];

    tags.forEach(doc => {
      const data = doc.data();
      let tag = new Tag();
      tag.color = data.color;
      tag.tagName = data.tagName;
      tag.user = data.user;
      result.push(tag);
    });

    return result;
  }

  //--------------------------------------------------------------------//

  //Проверка на существование такого пользователя
  isExistUser(login: string): boolean {
    let userSnapshot = getDocs(query(this.users, where("login", "==", login), limit(1)));

    userSnapshot.then(user => {
      user.forEach(usr => {
        const data = usr.data();
        return data.login != null ? true : false;
      });
    });

    return false;
  }

  //Регистрация нового пользователя
  async registration(login: string, password: string) {
    addDoc(this.users, {
      password: password,
      login: login
    });

    return login;
  }

  //Вход в аккаунт
  async login(login: string, password: string) {
    let user = await getDocs(query(this.users, where("login", "==", login), where("password", "==", password)));

    let result: string[] = [];
    user.forEach(usr => {
      const data = usr.data();
      result.push(data.login)
    });

    return result[0];
  }
}
