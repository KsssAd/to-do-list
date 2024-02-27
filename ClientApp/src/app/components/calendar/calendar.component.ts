import { Component, ViewChild } from '@angular/core';
import { Day } from '../../models/calendar.model';
import { ListItem, TodoList } from '../../models/to-do-list.model';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  public daysInMonth: Day[] = [];
  public monthName: string = "";
  public weekdayNames: string[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  public today = new Date();
  public selectedMonth = this.today;
  public selectedDate = this.today;
  public allTodoList: TodoList[] = [];
  public todoList: TodoList[] = [];
  public currTodoList: TodoList = new TodoList();

  constructor(
    private dbService: DbService,
  ) { }

  ngOnInit() {
    this.getAllTodoList();
    this.loadCalendar(this.today);
  }

  getAllTodoList() {
    this.dbService.getAllTodoLists().then(list => {
      this.allTodoList = list;
      this.dateClick(this.today.getDate());
    });
  }

  nextMonth() {
    this.selectedMonth = this.getNextMonth();
    this.loadCalendar(this.selectedMonth);
  }

  getNextMonth(): Date {
    return new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, this.selectedMonth.getDate());
  }

  prevMonth() {
    this.selectedMonth = this.getPrevMonth();
    this.loadCalendar(this.selectedMonth);
  }

  getPrevMonth(): Date {
    return  new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() - 1, this.selectedMonth.getDate());
  }

  isToday(day: number): boolean {
    return this.today.getFullYear() == this.selectedMonth.getFullYear()
      && this.today.getMonth() == this.selectedMonth.getMonth()
      && this.today.getDate() == day;
  }

  isNotEmptyDay(date: number) {
    let month = this.selectedMonth.getMonth();
    let year = this.selectedMonth.getFullYear();

    return this.allTodoList.some(p => p.date.getDate() === date
      && p.date.getMonth() === month
      && p.date.getFullYear() === year);
  }

  loadCalendar(date: Date) {
    this.daysInMonth = [];
    let countDays = this.getDayInMonth(date);

    let firstWeekday = this.getFirstDay(date).getDay();
    if (firstWeekday !== 1) {
      firstWeekday = firstWeekday === 0 ? 7 : firstWeekday;
      let countPrevDay = firstWeekday - 1;
      let prevMouth = this.getPrevMonth();
      let prevMonthDays = this.getDayInMonth(prevMouth);

      for (let i = prevMonthDays - countPrevDay + 1; i <= prevMonthDays ; i++) {
        this.daysInMonth.push({ date: i, isCurrMonth: false });
      }
    }

    for (let i = 1; i <= countDays; i++) {
      this.daysInMonth.push({ date: i, isCurrMonth: true });
    }

    let lastWeekday = this.getLastDay(date, countDays).getDay();
    if (lastWeekday !== 0) {
      let countNextDay = 7 - lastWeekday;

      for (let i = 1; i <= countNextDay; i++) {
        this.daysInMonth.push({ date: i, isCurrMonth: false });
      }
    }

    this.monthName = date.toLocaleString('default', { month: 'long' });
  }

  getDayInMonth(date: Date) {
    return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
  };

  getFirstDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  getLastDay(date: Date, lastDay: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), lastDay);
  }

  dateClick(date: number) {
    this.todoList = [];
    this.selectedDate = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), date);

    this.todoList = this.allTodoList.filter(p => p.date.toLocaleDateString() === this.selectedDate.toLocaleDateString());
  }

  showTodoListModal(todoList: TodoList) {
    this.currTodoList = todoList;
  }
}
