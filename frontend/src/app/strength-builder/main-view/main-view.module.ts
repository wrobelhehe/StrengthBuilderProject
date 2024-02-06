import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewRoutingModule } from './main-view-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PlansComponent } from './plans/plans.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainViewComponent } from './main-view.component';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { ErrorComponent } from './error/error.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AddExerciseComponent } from './dialogs/add-exercise/add-exercise.component';
import { ModalViewComponent } from './dialogs/modal-view/modal-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseFormComponent } from './dialogs/exercise-form/exercise-form.component';
import { VideoPlayerComponent } from './exercises/video-player/video-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { EditExerciseComponent } from './dialogs/edit-exercise/edit-exercise.component';
import { DeleteExerciseComponent } from './dialogs/delete-exercise/delete-exercise.component';
import { SmallModalViewComponent } from './dialogs/small-modal-view/small-modal-view.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    MainViewComponent,

    PlansComponent,
    SideNavComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    AnalysisComponent,
    CategoriesComponent,
    UsersComponent,
    ErrorComponent,
    ExercisesComponent,
    AddExerciseComponent,
    ModalViewComponent,
    ExerciseFormComponent,
    VideoPlayerComponent,
    EditExerciseComponent,
    DeleteExerciseComponent,
    SmallModalViewComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MainViewRoutingModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      extend: true
    }),
    SharedModule

  ],
})
export class MainViewModule { }
