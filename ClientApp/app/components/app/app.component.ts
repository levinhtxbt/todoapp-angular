import { Todo } from '../../models/todo';
import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  originTodos: Todo[] = [];
  todos: Todo[] = [];
  todo = '';
  visibleState = 'SHOW_ALL';

  ngOnInit(): void { }

  addTodo(todo: string) {

    let currentId = this.getMaxId();
    currentId++;

    this.originTodos = [...this.originTodos, {
      id: currentId,
      title: todo,
      isCompleted: false
    }];

    this.todos = this.originTodos;
    this.todo = '';

  }

  toggleTodo(id) {

    this.todos = this.originTodos.map(t => {
      if (t.id === id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });

  }

  filterTodo(filter: string) {

    this.visibleState = filter;

    this.todos = this.getVisibleTodos(filter);
  }

  private getMaxId() {

    const maxId = _.max(this.originTodos, function (t) {
      return t.id;
    }).id;

    if (maxId) {
      return maxId;
    } else {
      return 0;
    }
  }

  private getVisibleTodos(visibleState: string) {

    switch (visibleState) {
      case 'SHOW_ACTIVE':
        return this.originTodos.filter(t => !t.isCompleted);
      case 'SHOW_COMPLETED':
        return this.originTodos.filter(t => t.isCompleted);
      default:
        return this.originTodos;
    }
  }
}
