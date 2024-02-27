import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exercise } from 'src/app/data/interfaces/exercises.model';


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
import { BODY_PARTS, CATEGORIES, EXPERIENCE, MOVEMENT_PLANES, MOVEMENT_TYPES, TYPES } from 'src/app/data/mocks/plans-mocks';
import { delay } from 'rxjs';

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
  displayedColumns: string[] = ['select', 'exercise_name', 'movementType', 'category', 'type', 'exp', 'expand'];

  selection = new SelectionModel<Exercise>(true, []);
  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>([]);
  expandedElement!: Exercise | null;

  bodyParts = BODY_PARTS

  movementPlanes = MOVEMENT_PLANES

  movementTypes = MOVEMENT_TYPES

  types = TYPES

  categories = CATEGORIES

  experience = EXPERIENCE


  filters = [
    { key: 'movementType', options: this.movementTypes },
    { key: 'bodyPart', options: this.bodyParts },
    { key: 'movementPlane', options: this.movementPlanes },
    { key: 'type', options: this.types },
    { key: 'category', options: this.categories },
    { key: 'exp', options: this.experience }
  ];

  activeFilters: { [key: string]: string | null } = {};


  isExpandedRow = (row: any) => row === this.expandedElement;

  // selectedSet: ExerciseSet | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private strengthBuilderService: StrengthBuilderService,
    private modalService: NgbModal, private toast: ToastrService, private translate: TranslateService, private breakpointObserver: BreakpointObserver) {
    this.dataSource = new MatTableDataSource(this.exercises);
  }
  ngOnInit(): void {
    this.loadExercises();
    this.setupResponsiveColumns();
  }

  onDataSourceUpdated(updatedDataSource: MatTableDataSource<any>): void {
    this.dataSource = updatedDataSource;
  }
  loadExercises(): void {
    this.strengthBuilderService.getExercises()
      .pipe(delay(1500))
      .subscribe(data => {
        this.exercises = data;
        this.dataSource.data = this.exercises;
        console.log(this.exercises[0])
      });
  }

  setupResponsiveColumns(): void {
    const breakpoints = [
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ];

    this.breakpointObserver.observe(breakpoints).subscribe(result => {
      const activeBreakpoint = breakpoints.find(breakpoint => result.breakpoints[breakpoint]);
      switch (activeBreakpoint) {
        case Breakpoints.XLarge:
        case Breakpoints.Large:
          this.displayedColumns = ['select', 'exercise_name', 'movementType', 'category', 'type', 'exp', 'expand'];
          break;
        case Breakpoints.Medium:
          this.displayedColumns = ['select', 'exercise_name', 'movementType', 'category', 'type', 'expand'];
          break;
        case Breakpoints.Small:
        case Breakpoints.XSmall:
          this.displayedColumns = ['select', 'exercise_name', 'expand'];
          break;
        default:
          this.displayedColumns = ['select', 'exercise_name', 'category', 'type', 'exp', 'expand'];
      }
    });
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
  // selectSet(set: ExerciseSet): void {
  //   this.selectedSet = set;
  // }

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

