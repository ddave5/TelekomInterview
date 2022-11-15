import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private router: Router, 
    private route: ActivatedRoute,) { }

  editForm: FormGroup ;
  currentYear = (new Date()).getFullYear();
  isLoading = false;
  status: number | undefined;
  id: number; 
  url: string = "https://res.cloudinary.com/people-matters/image/upload/f_auto,q_auto,w_800,h_800,c_lpad/v1517845732/1517845731.jpg";
  errorMessage = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createEditFormGroup();
    this.loadMovie(this.id);
  }

  loadMovie(id: number): void {
    this.movieService.getCurrentMovie(id).subscribe(
      (data) => {
        this.id = data.id;
        this.url = data.url;
        const movie = {
          title: data.title,
          description: data.description,
          url: data.url,
          date: data.date
        }

        this.editForm.patchValue({...movie});
      },
      (error) => {
        this.errorMessage = 'Sajnáljuk, de nem találtunk ilyen filmet!'
      }
    )
  }

  createEditFormGroup(): void {
    this.editForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255)]),
      description: new FormControl(null,
      [
        Validators.required,
        Validators.maxLength(4096)]),
      url: new FormControl(null,
      [
        Validators.required,
        Validators.maxLength(4096)]),
      date: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4), 
        this.isNumericValidator('date')])
    });
  }

  private isNumericValidator(str: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueDate = formGroup.value;
      if( (isNaN(parseInt(valueDate))) || (parseInt(valueDate) < 1900) || (parseInt(valueDate) > this.currentYear)) {
        return {urlNumeric: true};
      }
      return null;
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    const updatedMovie: Movie = {
      id: this.id,
      title: this.editForm.value.title,
      description: this.editForm.value.description,
      url: this.editForm.value.url,
      date: this.editForm.value.date
    };

    this.isLoading = true;
    this.movieService.updateMovie(updatedMovie).subscribe(
      () => {},
      (response) => {
        this.isLoading = false;
        if (response.status === 200) {
          this.status = 200;
          this.router.navigateByUrl('movies');
        } else {
          this.status = 400;
        }
      }
    );
  }

  onCancel(): void {
    this.router.navigateByUrl('movies');
  }
  
  isNumberic(value: string): boolean {
    return isNaN(parseInt(value));
  }

}
