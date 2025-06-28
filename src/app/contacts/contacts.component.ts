import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  
  contacts: Contact[] = [];
  formGroupContact: FormGroup;
  isEditing: boolean = false;
  filteredContacts: Contact[] = [];
  
  searchTerm: string = '';
  selectedCategory: String = '';
  
  constructor(private service: ContactService, private formBuilder: FormBuilder){
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
    this.loadContacts();
  }

  loadContacts(){
    this.service.getAll().subscribe({
      
    })
  }








}
