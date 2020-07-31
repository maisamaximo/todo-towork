import { Component } from "@angular/core";
import { Task } from "src/models/task.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public title: string = "Work To-Do";
  public taskList: Task[] = [];
  public newTask: string = "";
  public form: FormGroup;
  public mode = "list";

  /**
   *
   */
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      taskTitle: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
    });
    this.load();
  }

  /**
   * Method responsible to add a new item (todo) at the list _todos_
   * @param todo - a string item
   */
  addTask() {
    const task = this.form.controls["taskTitle"].value;
    const id = this.taskList.length + 1;
    this.taskList.push(new Task(id, task, false));
    this.save();
    this.clearForm();
  }

  removeTask(todo: Task) {
    const index = this.taskList.indexOf(todo);
    if (index !== -1) {
      this.taskList.splice(index, 1);
    }
    this.save();
  }

  isDone(task: Task) {
    task.done = !task.done;
    this.save();
  }

  editTask(todo: Task) {
    const index = this.taskList.indexOf(todo);
  }

  clearForm() {
    this.form.reset();
  }

  save() {
    const data = JSON.stringify(this.taskList);
    localStorage.setItem("taskList", data);
    this.changeMode("list");
  }

  load() {
    const data = localStorage.getItem("taskList");
    if (data) {
      this.taskList = JSON.parse(data);
    } else {
      this.taskList = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
