import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnChanges {
  @ViewChild('input') input!: ElementRef;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() data!: any[];
  @Input() filters!: any[];
  @Output() dataSourceUpdated = new EventEmitter<MatTableDataSource<any>>();

  isExpanded = false;

  activeFilters: { [key: string]: string | null } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"]) {
      this.applyFilters();
    }
  }
  resetFilters() {
    this.filters = this.filters.map(filter => ({ ...filter, selected: null }));
    this.activeFilters = {};
    this.applyFilters();

    this.input.nativeElement.value = '';
    this.dataSource.filter = '';
  }
  toggleAccordion() {
    if (this.isExpanded) {
      this.accordion.closeAll();
    } else {
      this.accordion.openAll();
    }
    this.isExpanded = !this.isExpanded;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterByText(filterValue);
  }

  filterByText(value: string) {
    this.dataSource.filter = value;
    this.dataSourceUpdated.emit(this.dataSource);
  }

  onChange(value: string, criterion: string) {
    this.activeFilters[criterion] = value;
    this.applyFilters();
  }

  applyFilters(): void {
    const filteredData = this.data.filter(item => this.isItemMatchingFilters(item));
    this.dataSource.data = filteredData;
    this.dataSourceUpdated.emit(this.dataSource);
  }

  private isItemMatchingFilters(item: any): boolean {
    return Object.keys(this.activeFilters).every(key =>
      !this.activeFilters[key] || String(item[key]).toLowerCase().includes(String(this.activeFilters[key]).toLowerCase())
    );
  }
}
