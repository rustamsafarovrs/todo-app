import {Component, OnInit} from '@angular/core';
import {TodosService} from '../shared/todos.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('fadeOut', [
        state('deleted', style(
          {
            opacity: 0
          }
        )),
        transition('* => void', animate('500ms ease-out'))
      ],
    )
  ]
})
export class TodosComponent implements OnInit {

  search = '';

  constructor(public todosService: TodosService) {
  }

  onChange(id: number): void {
    this.todosService.onToggle(id);
  }

  removeTodo(id: number): void {
    this.todosService.removeTodo(id);
  }

  ngOnInit(): void {
  }
}
