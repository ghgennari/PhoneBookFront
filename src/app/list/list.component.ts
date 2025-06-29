import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  showFavoritesOnly: boolean = false;

  constructor(private service: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.service.getAll().subscribe({
      next: json => {
        this.contacts = json;
        this.filteredContacts = json;
      }
    });
  }

  filterContacts(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredContacts = this.contacts.filter(contact => {
      const matchesSearch = 
        contact.name.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.number.includes(term);

      const matchesFavorite = this.showFavoritesOnly ? contact.favorite : true;

      return matchesSearch && matchesFavorite;
    });
  }

  toggleFavorites(): void {
    this.showFavoritesOnly = !this.showFavoritesOnly;
    this.filterContacts();
  }

}
