import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  categoryFilter: string = '';
  showFavoritesOnly: boolean = false;

  constructor(private service: ContactService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: json => {
        this.contacts = json;
        this.filteredContacts = [...json];
      }
    });
  }

  filterContacts() {
    this.filteredContacts = this.contacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.categoryFilter || contact.category === this.categoryFilter;
      const matchesFavorite = !this.showFavoritesOnly || contact.favorite;

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }
}
