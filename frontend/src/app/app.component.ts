import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TodoModel } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: TodoModel[] = [];
  work: string = "";
  updateModel: TodoModel = new TodoModel();
  apiUrl: string = "http://localhost:5000/api";
  constructor(
    private _http: HttpClient
  ){
    this.getAll();
  }

  getAll(){
    this._http.get<TodoModel[]>(this.apiUrl + "/getall").subscribe(res=>{
      this.todos = res;
    });
  }

  add(){
    let model = {"work": this.work};
    this._http.post<any>(this.apiUrl + "/add",model).subscribe(res=>{
      this.getAll();
    });
  }

  delete(model: TodoModel){
    this._http.post<any>(this.apiUrl + "/delete",model).subscribe(res=>{
      this.getAll();
    });
  }

  get(model: TodoModel){
    this.updateModel = {...model};    
  }

  update(){
    this._http.post<any>(this.apiUrl + "/update",this.updateModel).subscribe(res=>{
      this.getAll();
    })
  }

}
