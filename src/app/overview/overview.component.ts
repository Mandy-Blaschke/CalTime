import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  minus = false;
  hours = [];
  calories = [0, 225, 550, 775, 1100, 1325, 1650, 1875, 2200];

  energyBar = 25;
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
    this.actualTime = this.updateTime();
    this.timeBar = this.pastTimeOfDayInPercent();
    this.pastMinutes = (this.now.getTime() - this.dayStart.getTime()) / 60 / 1000;
  }

  pastTimeOfDayInPercent(): number {
    const pastHours = (this.now.getTime() - this.dayStart.getTime()) / 60 / 60 / 1000;
    const hoursPerDay = 24;

    return pastHours / hoursPerDay * 100;
  }

  updateTime(): string {
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

}