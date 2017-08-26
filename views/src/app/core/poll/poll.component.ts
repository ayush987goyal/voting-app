import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { MongoService } from '../../mongo.service';
import { NgForm } from "@angular/forms";
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  id: string;
  userIp: string;
  poll;
  pollUser: string;
  pollName: string;
  pollOptions = [];
  pollVotedUsers = [];
  choice = '';
  dialogVisible = false;
  isLoading: boolean = false;
  isValid: boolean;
  mainUser: string;
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string = 'pie';

  @ViewChild('f') form: NgForm;

  constructor(private router: Router, private route: ActivatedRoute, private mongoService: MongoService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.isLoading = true;

        this.mongoService.getPollById(this.id).subscribe(
          (res) => {
            this.poll = res[0];
            this.pollUser = res[0].user;
            this.pollName = res[0].poll.name;
            this.pollOptions = res[0].poll.options;
            this.pollVotedUsers = res[0].votedUsers;
            this.isLoading = false;

            let tempData: number[] = [];
            let templabels: string[] = [];
            for (let opt of this.pollOptions) {
              templabels.push(opt.name);
              tempData.push(opt.voteCount);
            }
            this.pieChartLabels = templabels;
            this.pieChartData = tempData;
          }
        );

      }
    );

    this.authService.validityUpdated.subscribe(
      (obj: any) => {
        this.isValid = obj.isValid;
        this.mainUser = obj.userEmail;
      }
    );
    this.isValid = this.authService.isAuthenticated();
    this.mainUser = this.authService.userEmail;
    this.mongoService.getIp().subscribe(
      (res) => {
        this.userIp = res.ip;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  choiceChange(option) {
    this.choice = option;
  }

  onCustomChoice() {
    if (this.isValid) {
      this.dialogToggle();
    }
    else {
      alert("Please login for custom option!")
    }
  }

  dialogToggle() {
    this.dialogVisible = !this.dialogVisible;
  }

  updatePoll() {
    if (this.hasUserVoted()) {
      alert("You have already voted")
    }
    else {
      this.poll.poll.options = this.pollOptions;
      if (this.mainUser) {
        this.poll.votedUsers.push(this.mainUser);
      }
      else {
        this.poll.votedUsers.push(this.userIp);
      }
      let obj = {
        pollId: this.id,
        pollData: this.poll.poll,
        pollVotedUsers: this.poll.votedUsers
      };
      this.mongoService.updatePollById(obj).subscribe(
        (res) => {
          // console.log(res);
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  hasUserVoted() {
    if (this.pollVotedUsers) {
      if (this.mainUser) {
        if (this.pollVotedUsers.indexOf(this.mainUser) >= 0) {
          return true;
        }
      }
      if (this.pollVotedUsers.indexOf(this.userIp) >= 0) {
        return true;
      }

      return false;
    }
    return false;
  }

  onVote() {

    for (let opt of this.pollOptions) {
      if (opt.name === this.choice) {
        opt.voteCount++;
        break;
      }
    }
    this.choice = '';
    this.updatePoll();
  }

  onSubmit(f) {
    this.pollOptions.push({
      name: this.form.value.custom,
      voteCount: 1
    });
    this.updatePoll();
    this.dialogToggle();
  }

  onDelete() {
    this.mongoService.deletePollById(this.id).subscribe(
      (res) => {
        // console.log(res);
        this.router.navigate(['/mypolls']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
