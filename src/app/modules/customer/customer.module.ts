import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressModalComponent } from './components/customer-form/address-modal/address-modal.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    CustomerFormComponent,
    AddressModalComponent,
  ],

  entryComponents: [AddressModalComponent],
  imports: [CommonModule, CustomerRoutingModule, ReactiveFormsModule],
})
export class CustomerModule {}
