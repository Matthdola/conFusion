import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Feedback, ContactType} from '../share/feedback';
import { visibility, flyInOut, expand } from '../animations/app.animation';

import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
    visibility()
  ]
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackresponse: Feedback;
  errMess: string;
  contactType = ContactType;
  @ViewChild('fform', {static: false}) feedFormDirectives: any;
  visibility = 'shown';
  submitingform: boolean;
  formreseted: boolean;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required.',
      'minLength': 'First name must be at least 2 characters long.',
      'maxLength': 'First name cannot be more than 25 characters.'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minLength': 'Last name must be at least 2 characters long.',
      'maxLength': 'Last name cannot be more than 25 characters.'
    },
    'telnum': {
      'required': 'Tel number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Emailis required.',
      'email': 'Email not in valid format.'
    },
  };

  constructor(private feedbackService: FeedbackService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.submitingform = false;
    this.formreseted = true;
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onSubmit() {
    this.feedbackresponse = null;
    this.feedback = this.feedbackForm.value;
    this.submitingform = true;
    this.visibility = 'hidden';
    this.formreseted = false;

    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(feedback => {
        this.submitingform = false;
        this.feedbackresponse = feedback;
        this.feedback = feedback;
        setTimeout(() => {
          this.feedbackresponse = null;
          this.visibility = 'shown';
          this.formreseted = true;
          this.feedbackForm.reset({
            firstname: '',
            lastname: '',
            telnum: 0,
            email: '',
            agree: false,
            contacttype: '',
            message: ''
          });
          this.feedFormDirectives.resetForm();
        }, 5000);


      },
        errmess => {
          this.submitingform = false;
          this.errMess = errmess as any;
      });
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // Clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
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
}

