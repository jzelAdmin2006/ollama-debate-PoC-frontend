import { Component } from '@angular/core';
import { DebateComponent } from './components/debate/debate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DebateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
