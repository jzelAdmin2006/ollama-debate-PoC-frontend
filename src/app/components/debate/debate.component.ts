import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { DebateService } from '../../services/debate.service';

@Component({
  selector: 'app-debate',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './debate.component.html',
  styleUrl: './debate.component.scss',
})
export class DebateComponent {
  input: string = '';
  exchanges: number = 2;
  debateResponses: any[] = [];

  private readonly debateService = inject(DebateService);

  submitDebate(): void {
    this.debateService.startDebate(this.input, this.exchanges).subscribe({
      next: (responses) => (this.debateResponses = responses),
      error: (error) => console.error('There was an error!', error),
    });
  }
}
