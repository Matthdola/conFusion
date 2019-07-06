import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Location } from '@angular/common';

import { Dish } from '../share/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../share/comment';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  //@Input()
  dish: Dish;
  dishcopy: Dish;
  errMess: string;
  dishIds: string[];
  next: string;
  prev: string;
  commentForm: FormGroup;
  comment: Comment;
  @ViewChild('cform', {static: false}) commentFormDirectives: any;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    author: {
      required: 'The author name of the comment is required',
      minLengh: 'The author name must be at least 2 characters long.',
      maxLength: 'The author name can not be more than 25 characters.'
    },
    comment: {
      required: 'The comment is required.',
      minLengh: 'Comment must be at least 5 characters long.',
      maxLength: 'Comment cannot be more than 25 characters.'
    }
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL
    ) { this.createForm(); }

  ngOnInit() {
      /*  /dishdetail/23 */
      //this.dish = this.dishService.getDish(id);
    //this.dishService.getDish(id)
    this.dishService.getDishIds()
        .subscribe((dishIds) => this.dishIds = dishIds);

    this.route.params
        .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
        .subscribe(dish => {this.dish =  dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
          errmess => this.errMess = errmess as any);

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1) {
      return Math.round(value / 1);
    }

    return value;
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; },
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = errmess as any; });
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    this.commentFormDirectives.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // Clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid ) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
