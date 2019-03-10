import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDividerModule,
  MatRadioModule,
  MatTabsModule,
  MatListModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatTableModule,
  MatMenuModule,

  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';

const materialModules = [
  CommonModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDividerModule,
  MatRadioModule,
  MatTabsModule,
  MatListModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatTableModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressSpinnerModule
  ];
@NgModule({
  imports: [
      materialModules
  ],
  exports: [
     materialModules
  ]
})
export class CustomMaterialModule {

}
