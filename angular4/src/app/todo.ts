export class Todo {
  id: number;
  title: string = '';
  complete: boolean = false;
  focused: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
