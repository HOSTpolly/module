import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ReactFormComponent } from '../react-form/react-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { MatrixComponent } from '../matrix/matrix.component';
import { MatrixService } from '../services/matrix.service';
import { MatrixFormComponent } from '../matrix-form/matrix-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
    ],
  providers: [MatrixService],
  declarations: [HomePage,ReactFormComponent,MatrixComponent,MatrixFormComponent]
})
export class HomePageModule {}



