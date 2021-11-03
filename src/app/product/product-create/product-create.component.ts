import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  form: FormGroup;
  pidControl = new FormControl('');
  nameControl = new FormControl('');
  categoryControl = new FormControl('');
  
  metals = [
    { value: 'gold', checked: false},
    { value: 'silver', checked: false},
    { value: 'platinum', checked: false},
    { value: 'palladinum', checked: false},
    { value: 'other', checked: false}
  ];

  constructor() {
    this.form = new FormGroup({
      pid: this.pidControl,
      name: this.nameControl,
      category: this.categoryControl
    });
  }

  @Input() error: string | undefined ;
  @Output() submitEM = new EventEmitter();

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.form.value.metal = [];
      this.metals.forEach(metal => {
        if (metal.checked == true) this.form.value.metal.push(metal.value);
      });
      this.submitEM.emit(this.form.value);
    }
    
  }

  updateMetals(box:any) {
    switch (box.source.name) {
      case 'gold':
        this.metals[0].checked = box.checked;
        break;
      case 'silver':
        this.metals[1].checked = box.checked;
        break;
      case 'platinum':
        this.metals[2].checked = box.checked;
        break;
      case 'palladinum':
        this.metals[3].checked = box.checked;
        break;
      default:
        this.metals[4].checked = box.checked;
        break;
    }
  }
}

