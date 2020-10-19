import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {delay} from 'rxjs/operators';
import {TodosService} from './shared/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
    'shared/css/button.css',
    'shared/css/core.css'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0,
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('800ms ease-in'))
    ])
  ]
})
export class AppComponent implements OnInit {
  appTitle = 'Angular todo app';

  show = false;
  loading = true;

  showEntries = 3;

  entries = [3, 5, 10, 20];

  constructor(private todosService: TodosService) {
  }

  ngOnInit(): void {
    if (!isNaN(Number(localStorage.getItem('showEntries')))) {
      this.showEntries = Number(localStorage.getItem('showEntries'));
    } else {
      this.showEntries = 3;
    }
    this.fetchTodos();
  }


  fetchTodos() {
    localStorage.setItem('showEntries', String(this.showEntries));
    this.todosService.fetchTodos(this.showEntries)
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
