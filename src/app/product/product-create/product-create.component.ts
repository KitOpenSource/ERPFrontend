import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  metals = [
    { value: 'gold', checked: false},
    { value: 'silver', checked: false},
    { value: 'platinum', checked: false},
    { value: 'palladinum', checked: false},
    { value: 'other', checked: false}
  ];

  countrys = [
    'America', 'American Samoa', 'Australia', 'Austria',
    'Belarus', 'Belgium', 'Bhutan', 'British Virgin Islands',
    'Cameroon', 'Canada', 'Chad', 'China', 'Cook Islands', 'Czech Republic',
    'Fiji', 'Finland', 'France',
    'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Great Britian',
    'Hong Kong',
    'Israel', 'Italy',
    'Japan',
    'Laos', 'Latvia',
    'Macau', 'Mexico', 'Mongolia',
    'Netherlands', 'New Zealand', 'Niue', 'North Korea',
    'Palau', 'Papua New Guinea', 'Poland', 'Portugal',
    'Russia', 'Rwanda',
    'Samoa', 'Singapore', 'Solomon Islands', 'South Africa', 'South Korea', 'Spain', 'Switzerland',
    'Togo', 'Tokelau', 'Tuvalu',
    'Vanuatu', 'Vatican City',
    'Other'
  ];

  manufacturers = [
    'All Collect', 'Austrian Mint',
    'China Gold Corp', 'CIT', 'Czech Mint',
    'Heraeus', 'Holy Land Mint of Israel',
    'Japan Mint',
    'MDM', 'Mexican Mint', 'Mint Of Poland', 'MNI', 'Monnaie de Paris',
    'New Zealand Mint',
    'PAMP', 'Pobjoy Mint',
    'Royal Australia Mint', 'Royal Canadian Mint', 'Royal Dutch Mint',
    'Scottsdale Mint', 'South African Mint', 'Sunshine Mint',
    'The Perth Mint','The Royal Mint', 'The Singapore Mint',
    'United States Mint',
    'Valcambi Mint',
    'Other'
  ];

  form: FormGroup;
  pidControl = new FormControl('');
  nameControl = new FormControl('');
  cnameControl = new FormControl('');
  categoryControl = new FormControl('');
  subcategoryControl = new FormControl('');
  countryControl = new FormControl('');
  denominationControl = new FormControl('');
  manufacturerControl = new FormControl('');
  mintageControl = new FormControl(Validators.min(10));
  diameterControl = new FormControl(Validators.min(0.1));
  thicknessControl = new FormControl(Validators.min(0.1));
  purityControl = new FormControl('');
  finishControl = new FormControl('');
  weight_auControl = new FormControl(Validators.min(0));
  weight_agControl = new FormControl(Validators.min(0));
  weight_ptControl = new FormControl(Validators.min(0));
  weight_pdControl = new FormControl(Validators.min(0));
  gross_weightControl = new FormControl(Validators.min(0));

  constructor() {
    this.form = new FormGroup({
      pid: this.pidControl,
      name: this.nameControl,
      cname: this.cnameControl,
      category: this.categoryControl,
      subcategory: this.subcategoryControl,
      country: this.countryControl,
      denomination: this.denominationControl,
      manufacturer: this.manufacturerControl,
      mintage: this.mintageControl,
      diameter: this.diameterControl,
      thickness: this.thicknessControl,
      purity: this.purityControl,
      finish: this.finishControl,
      weight_au: this.weight_auControl,
      weight_ag: this.weight_agControl,
      weight_pt: this.weight_ptControl,
      weight_pd: this.weight_pdControl,
      gross_weight: this.gross_weightControl
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

