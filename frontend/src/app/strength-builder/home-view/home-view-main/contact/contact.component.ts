import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {

  submitMessage: string = 'submit_confirmation';
  isSubmit: boolean = false;
  spinning = false
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  submitEmail(value: any) {
    if (this.contactForm.valid) {
      this.firestore.collection('emails').add(value).then(() => {
        this.submitMessage = 'Email sent successfully!';
        this.spinning = false
        this.isSubmit = true
        this.contactForm.reset()
        setTimeout(() => this.isSubmit = false, 5000);
      }).catch(error => {
        console.error('Error sending message: ', error);
      });


    }
  }

}
