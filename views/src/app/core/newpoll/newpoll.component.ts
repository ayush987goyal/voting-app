import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-newpoll',
  templateUrl: './newpoll.component.html',
  styleUrls: ['./newpoll.component.css']
})
export class NewpollComponent implements OnInit {

  pollName: string;
  pollOptions: string[] = ['', ''];

  @ViewChild('f') form: NgForm;

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index, item) {
    return index;
  }

  addOption() {
    this.pollOptions.push('');
  }

  onSubmit(form) {
    console.log(this.form.value.name);
    console.log(this.pollOptions);
  }

}
