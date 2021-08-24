import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';

import { AdminOperationComponent } from './components/admin-operation/admin-operation.component';
import { AdminExportComponent } from './components/admin-export/admin-export.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminMainComponent,
    AdminOperationComponent,
    AdminExportComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
