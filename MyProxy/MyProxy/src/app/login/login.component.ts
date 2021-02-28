import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  countries: {};

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) { }


  ngOnInit() {

    this.accountService.getCountries().subscribe(
      data => this.countries = data
    );
    this.form = this.formBuilder.group({
      countryId: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }



  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f.username.value, this.f.password.value, this.f.countryId.value)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Success");
          this.loading = false;
          // get return url from query parameters or default to home page
        //  this.router.navigateByUrl("");
        },
        error: error => {
          // this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
