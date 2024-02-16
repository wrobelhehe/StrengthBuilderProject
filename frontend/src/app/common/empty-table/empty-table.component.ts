import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empty-table',
  templateUrl: './empty-table.component.html',
  styleUrls: ['./empty-table.component.scss']
})
export class EmptyTableComponent {
  @Input() displayedColumns!: string[];

  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  expandedElement!: any

  constructor() {
    this.dataSource2 = new MatTableDataSource([{}, {}, {}, {}, {}]);

  }

}
