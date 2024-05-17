import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() enablePrevPagination = true;
  @Input() enableNextPagination = true;
  @Output() paginate = new EventEmitter<'next' | 'prev'>();
}
