import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  minus = false;
  hours = [];
  calories = [0, 550, 1100, 1650, 2200];
  buttons = [150, 200, 250, 300, 500, 1000];

  caloriesEaten = 0;
  actualTime = '';
  timeBar = 0;
  now = new Date();
  pastMinutes = 0;
  dayStart = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), 0, 0, 0);

  constructor() {
  }

  fillHourArray(): void {
    let n = 0;
    while (n <= 24) {
      this.hours.push(n);
      n = n + 2;
    }
  }

  ngOnInit(): void {
    this.fillHourArray();
    this.updateTime();
    setInterval(() => this.updateTime(), 60000);
  }


  private updateTime(): void {
    this.loadLocalStorage();
    this.actualTime = this.getTimeString();
    this.timeBar = this.pastTimeOfDayInPercent();
    this.pastMinutes = (this.now.getTime() - this.dayStart.getTime()) / 60 / 1000;
  }

  pastTimeOfDayInPercent(): number {
    const pastHours = (this.now.getTime() - this.dayStart.getTime()) / 60 / 60 / 1000;
    const hoursPerDay = 24;

    return pastHours / hoursPerDay * 100;
  }

  getTimeString(): string {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    return this.addLeadingZero(hours) + ':' + this.addLeadingZero(minutes);
  }

  addLeadingZero(value): string {
    if (value < 10) {
      value = '0' + value.toString();
    }
    return value;
  }

  addCalories(value: number): void {
    this.caloriesEaten += (value / 2200 * 100);
    this.saveToLocalStorage();
  }

  subtractCalories(value: number): void {
    this.caloriesEaten -= (value / 2200 * 100);
    this.caloriesEaten = Math.max(0, this.caloriesEaten);
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    const data: Data = {
      caloriesEaten: this.caloriesEaten,
      date: this.getDate(new Date()),
    };
    localStorage.setItem('calories-eaten', JSON.stringify(data));
  }

  loadLocalStorage(): void {
    const maybeDataString = localStorage.getItem('calories-eaten');
    if (maybeDataString != null) {
      const data = JSON.parse(maybeDataString) as Data;
      if (this.getDate(new Date()) === data.date) {
        this.caloriesEaten = data.caloriesEaten;
      } else {
        this.caloriesEaten = 0;
      }
    }
  }

  getDate(now: Date): string {
    return this.addLeadingZero(now.getDate()) + '.' + this.addLeadingZero(now.getMonth() + 1) + '.' + now.getFullYear();
  }
}

interface Data {
  caloriesEaten: number;
  date: string;
}
