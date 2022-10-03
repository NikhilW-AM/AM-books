import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
})
export class AddressModalComponent implements OnInit {
  addressForm: FormGroup;
  @Output() emitService: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal, private _fb: FormBuilder) {}

  close() {
    this.activeModal.close();
  }

 
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addressForm = this._fb.group({
      address: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      pinCode: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
    });
  }
  submit() {
    this.emitService.next(this.addressForm.value);

    this.activeModal.close(this.addressForm.value);
  }

}
