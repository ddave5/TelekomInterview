import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnChanges{


  constructor(private router: Router, private movieService: MovieService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.createForm);
  }

  createForm: FormGroup ;
  currentYear = (new Date()).getFullYear();
  isLoading = false;
  createStatus: number | undefined;

  ngOnInit(): void {
    this.createForm = new FormGroup({
      title: new FormControl(null, [Validators.required,Validators.maxLength(255)]),
      description: new FormControl(null, [Validators.required,Validators.maxLength(4096)]),
      url: new FormControl(null, [Validators.required,Validators.maxLength(4096)]),
      date: new FormControl(null, [Validators.required,Validators.maxLength(4), Validators.minLength(4), this.isNumericValidator('date')])
    })
  }

  private isNumericValidator(str: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueDate = formGroup.value;
      if( (isNaN(parseInt(valueDate))) || (parseInt(valueDate) < 1900 || parseInt(valueDate) > this.currentYear)) {
        return {urlNumeric: true};
      }
      return null;
    }
  }

  onSubmit(): void {

    const createdMovie: Movie = {
      title: this.createForm.value.title,
      description: this.createForm.value.description,
      url: this.createForm.value.url,
      date: this.createForm.value.date
    };

    this.isLoading = true;
    this.movieService.saveMovie(createdMovie).subscribe(
      () => {},
      (response) => {
        this.isLoading = false;
        if (response.status === 200) {
          this.createStatus = 200;
          this.router.navigateByUrl('movies');
        } else {
          this.createStatus = 400;
        }
      }
    );
  }

  onCancel(): void {
    this.router.navigateByUrl('movies');
  }



}
