import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {delay} from 'rxjs/operators';
import {TodosService} from './shared/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
    'shared/css/button.css'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0,
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})
export class AppComponent implements OnInit {
  appTitle = 'Angular todo app';

  show = false;
  loading = true;

  constructor(private todosService: TodosService) {
  }

  ngOnInit(): void {
    this.todosService.fetchTodos()
      .pipe(delay(1000))
      .subscribe(() => {
        this.loading = false;
      });
  }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }


  toggle() {
    this.show = !this.show;
  }


}
