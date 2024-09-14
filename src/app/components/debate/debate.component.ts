import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { DebateService } from '../../services/debate.service';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { DebateResponse } from '../../debate-response';

@Component({
  selector: 'app-debate',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, MarkdownPipe, AsyncPipe, NgClass],
  templateUrl: './debate.component.html',
  styleUrl: './debate.component.scss',
})
export class DebateComponent {
  input: string = '';
  exchanges: number = 2;
  debateResponses: DebateResponse[] = [];
  loading = false;

  private readonly debateService = inject(DebateService);

  submitDebate(): void {
    this.loading = true;
    this.debateResponses = [];
    this.debateService.startDebate(this.input, this.exchanges).subscribe({
      next: (responses) => {
        this.debateResponses = responses;
        this.loading = false;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }
}
