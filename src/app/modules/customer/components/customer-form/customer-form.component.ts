import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddressModalComponent } from './address-modal/address-modal.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class CustomerFormComponent implements OnInit {
  createCustomerForm: FormGroup;
  modalRef: any;

  constructor(
    config: NgbModalConfig,
    public modalService: NgbModal,
    private _fb: FormBuilder
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    this.modalRef = this.modalService
      .open(AddressModalComponent, { centered: true })
      .result.then(
        (result) => {
          if (result) this.addAdderess(result);
        },
        (reason) => {}
      );
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createCustomerForm = this._fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      website: ['', Validators.compose([Validators.required])],
      reference: ['', Validators.compose([Validators.required])],
      gstNumber: ['', Validators.compose([Validators.required])],
      addresses: this._fb.array([]),
    });
  }

  addresses(): FormArray {
    return this.createCustomerForm.get('addresses') as FormArray;
  }

  newAddress(addressObj: any): FormGroup {
    let { address, city, pinCode, state, country } = addressObj;
    return this._fb.group({
      address: address,
      city: city,
      pinCode: pinCode,
      state: state,
      country: country,
    });
  }

  addAdderess(addressObj: any) {
    this.addresses().push(this.newAddress(addressObj));
  }

  removeAddress(i: number) {
    this.addresses().removeAt(i);
  }

  editAddress(address: any, index: number) {
    console.log(address.value);
    this.addresses().at(index).patchValue(address);
  }

  submit() {
    console.log(this.createCustomerForm.value);
  }
}
