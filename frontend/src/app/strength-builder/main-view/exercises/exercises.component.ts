import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exercise, ExerciseSet } from 'src/app/data/interfaces/exercises.model';


import { StrengthBuilderService } from 'src/app/data/services/strength-builder.service';
import { ModalViewComponent } from '../dialogs/modal-view/modal-view.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ExercisesComponent implements OnInit, AfterViewInit {
  exercises: Exercise[] = []
  displayedColumns: string[] = ['select', 'name', 'category', 'type', 'exp', 'videoUrl', 'actions', 'expand'];
  // columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  selection = new SelectionModel<Exercise>(true, []);

  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>([]);
  expandedElement!: Exercise | null;

  isExpandedRow = (row: any) => row === this.expandedElement;

  selectedSet: ExerciseSet | null = null;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private strengthBuilderService: StrengthBuilderService,
    private modalService: NgbModal, private toast: ToastrService, private translate: TranslateService) {
    this.dataSource = new MatTableDataSource(this.exercises);

  }
  ngOnInit(): void {
    this.strengthBuilderService.getExercises().subscribe(data => {
      this.exercises = data;
      console.log(this.exercises)
      this.dataSource.data = this.exercises;
    });
  }

  ngAfterViewInit() {
    this.initializeDataSource()
  }

  initializeDataSource() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openFullscreen() {
    const modalRef = this.modalService.open(ModalViewComponent, { fullscreen: true });
    modalRef.componentInstance.headerTitle = 'add-exercise'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  selectSet(set: ExerciseSet): void {
    this.selectedSet = set;
  }


}

