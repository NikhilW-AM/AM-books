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
  addressForm:any
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
    const modalRef = this.modalService
      .open(AddressModalComponent, { centered: true })
    //   .result.then(
    //     (result) => {
    //       //console.log(result)
    //       //if (result) this.addAdderess(result);
    //       this.addressForm = result
    //     },
    //     (reason) => {}
    // );
   
    modalRef.componentInstance.emitService.subscribe((emmitedValue:any) => {
      //console.log(this.newAddress(emmitedValue))
      this.addresses().push(this.newAddress(emmitedValue));
  });
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
    console.log('k')
    return this.createCustomerForm.get('addresses') as FormArray;
  }

  newAddress(emmitedValue: any): FormGroup {
    console.log(emmitedValue)
    let { address, city, pinCode, state, country } = emmitedValue;
    return this._fb.group({
      address: address,
      city: city,
      pinCode: pinCode,
      state: state,
      country: country,
    });
  }

  addAdderess(emmitedValue:any) {
    this.addresses().push(this.newAddress(emmitedValue));
  }

  removeAddress(i: number) {
    this.addresses().removeAt(i);
  }

  editAddress(address: any, index: number) {
    //console.log(address.value);
    this.addresses().at(index).patchValue(address);
  }

  submit() {
    console.log(this.createCustomerForm.value);
  }
}
