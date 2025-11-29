import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock-widget.html',
  styleUrls: ['./clock-widget.css']
})
export class ClockWidgetComponent implements OnInit, OnDestroy {
  currentTime = '';
  private t?: number;

  ngOnInit(): void {
    this.update();
    this.t = window.setInterval(() => this.update(), 1000);
  }

  ngOnDestroy(): void {
    if (this.t) clearInterval(this.t);
  }

  update() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
}
