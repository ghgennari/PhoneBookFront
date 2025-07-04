import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  formGroupContact: FormGroup;

  constructor(
    private service: ContactService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupContact = formBuilder.group({
      id: [''],
      name: [''],
      number: [''],
      email: [''],
      address: [''],
      category: [''],
      favorite: [false],
      notes: [''],
      photoUrl: ['']
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  save() {
    this.service.save(this.formGroupContact.value).subscribe({
      next: json => {
        console.log("Contato salvo:", json);
        this.formGroupContact.reset();
      }
    });
  }
}
