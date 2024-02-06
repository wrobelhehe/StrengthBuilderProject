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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SmallModalViewComponent } from '../dialogs/small-modal-view/small-modal-view.component';

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
  displayedColumns: string[] = ['select', 'name', 'category', 'type', 'exp', 'sets', 'expand'];

  selection = new SelectionModel<Exercise>(true, []);

  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>([]);
  expandedElement!: Exercise | null;

  isExpandedRow = (row: any) => row === this.expandedElement;

  selectedSet: ExerciseSet | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private strengthBuilderService: StrengthBuilderService,
    private modalService: NgbModal, private toast: ToastrService, private translate: TranslateService, private breakpointObserver: BreakpointObserver) {
    this.dataSource = new MatTableDataSource(this.exercises);


  }
  ngOnInit(): void {
    this.strengthBuilderService.getExercises().subscribe(data => {
      this.exercises = data;
      console.log(this.exercises)
      this.dataSource.data = this.exercises;
    });

    const breakpoints = [
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ];

    this.breakpointObserver
      .observe(breakpoints)
      .subscribe(result => {
        const activeBreakpoint = breakpoints.find(breakpoint => result.breakpoints[breakpoint]);

        switch (activeBreakpoint) {
          case Breakpoints.XLarge:
          case Breakpoints.Large:
            this.displayedColumns = ['select', 'name', 'category', 'type', 'exp', 'sets', 'expand'];
            break;
          case Breakpoints.Medium:
            this.displayedColumns = ['select', 'name', 'category', 'type', 'sets', 'expand'];
            break;
          case Breakpoints.Small:
            this.displayedColumns = ['select', 'name', 'category', 'sets', 'expand'];
            break;
          case Breakpoints.XSmall:
            this.displayedColumns = ['select', 'name', 'expand'];
            break;
          default:
            this.displayedColumns = ['select', 'name', 'category', 'type', 'exp', 'videoUrl', 'actions', 'expand'];
        }
      });

    console.log(this.displayedColumns)
  }

  ngAfterViewInit() {
    this.initializeDataSource()
  }

  initializeDataSource() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addExercise() {
    const modalRef = this.modalService.open(ModalViewComponent, { fullscreen: true });
    modalRef.componentInstance.headerTitle = 'add-exercise'
    modalRef.result.then(
      () => this.selection.clear(),
      () => this.selection.clear()
    );
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

  deleteExercise() {
    if (this.selection.selected.length) {
      console.log(this.selection.selected)
      const selectedRows = this.selection.selected;
      const modalRef = this.modalService.open(SmallModalViewComponent, { size: 'lg' });
      modalRef.componentInstance.headerTitle = 'delete-exercise'
      modalRef.componentInstance.data = selectedRows
      modalRef.result.then(
        () => this.selection.clear(),
        () => this.selection.clear()
      );

    }
  }


  editExercise() {
    if (this.selection.selected.length === 1) {
      const selectedRow = this.selection.selected[0];
      const modalRef = this.modalService.open(ModalViewComponent, { fullscreen: true });
      modalRef.componentInstance.headerTitle = 'edit-exercise'
      modalRef.componentInstance.data = selectedRow
      modalRef.result.then(
        () => this.selection.clear(),
        () => this.selection.clear()
      );
    }
  }
}

