import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  async transform(value: string): Promise<SafeHtml> {
    return this.sanitizer.bypassSecurityTrustHtml(await marked.parse(value));
  }
}
