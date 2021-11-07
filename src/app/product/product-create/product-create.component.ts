import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYY',
  },
};

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ProductCreateComponent implements OnInit {

  @Input() error: string | null | undefined ;
  @Input() success: string | null | undefined ;
  @Output() submitEM = new EventEmitter();

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
  mintageControl = new FormControl('0',Validators.min(0));
  diameterControl = new FormControl('');
  thicknessControl = new FormControl('');
  purityControl = new FormControl('');
  finishControl = new FormControl('');
  weight_auControl = new FormControl('0',Validators.min(0));
  weight_agControl = new FormControl('0',Validators.min(0));
  weight_ptControl = new FormControl('0',Validators.min(0));
  weight_pdControl = new FormControl('0',Validators.min(0));
  gross_weightControl = new FormControl('0',Validators.min(0));
  date = new FormControl(moment());

  constructor(private productService: ProductService, private router: Router) {
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
      gross_weight: this.gross_weightControl,
      date: this.date
    });

    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTags.slice())),
    );
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.form.value.metal = [];
      let metalVaild = false;
      this.metals.forEach(metal => {
        if (metal.checked == true) {
          this.form.value.metal.push(metal.value);
          metalVaild = true;
        }
      });
      if (!metalVaild) {
        this.error = "Metal Required!";
        return;
      }
      this.form.value.year = (this.date.value as Moment).year();
      this.form.value.tag = this.tags;
      console.log(this.form.value);
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

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    console.log((ctrlValue as Moment).year());
    datepicker.close();
  }

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]> | undefined;
  tags: string[] = [];
  allTags: string[] = ['queen', 'animal', 'lunar', 'christmas', 'love'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;
 
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value.toLocaleLowerCase());
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  
  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput!.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  genNewPid() {
    this.productService.genNewPid().subscribe(
      (newPid) => {
        console.log(newPid);
        this.pidControl.setValue(newPid);
      },
      (err) => {
        this.error = "Unknow Error when gen new Pid";
      }
    );
  }

  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: Product = new Product();
        csvRecord.pid = curruntRecord[15].trim();
        csvRecord.name = curruntRecord[14].trim();
        csvRecord.cname = curruntRecord[4].trim();
        csvRecord.category = curruntRecord[3].trim();
        csvRecord.subcategory = curruntRecord[20].trim();
        csvRecord.country = curruntRecord[5].trim();
        csvRecord.denomination = curruntRecord[6].trim();
        csvRecord.manufacturer = curruntRecord[11].trim();
        csvRecord.mintage = Number(curruntRecord[13].trim());
        csvRecord.diameter = curruntRecord[7].trim();
        csvRecord.thickness = Number(curruntRecord[22].trim());
        csvRecord.purity = curruntRecord[18].trim();
        csvRecord.finish = curruntRecord[8].trim();
        csvRecord.weight_au = Number(curruntRecord[24].trim());
        csvRecord.weight_ag = Number(curruntRecord[23].trim());
        csvRecord.weight_pt = Number(curruntRecord[26].trim());
        csvRecord.weight_pd = Number(curruntRecord[25].trim());
        csvRecord.gross_weight = Number(curruntRecord[9].trim());
        csvRecord.year = Number(curruntRecord[27].trim());
        // csvRecord.id = curruntRecord[0].trim();
        // csvRecord.firstName = curruntRecord[1].trim();
        // csvRecord.lastName = curruntRecord[2].trim();
        // csvRecord.age = curruntRecord[3].trim();
        // csvRecord.position = curruntRecord[4].trim();
        // csvRecord.mobile = curruntRecord[5].trim();
        csvArr.push(csvRecord);
      }
    }
    // console.log(csvArr);
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

  newMultiProduct() {
    console.log(this.records);
    this.productService.newMultiProduct(this.records).subscribe(
      (products) => {
        alert("批量新增成功");
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
      },
      (err) => {
        this.error = "Unknow Error";
      }
    );
  }
}

