import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { Product } from './product';
import { FormGroup } from '@angular/forms';

// export interface PeriodicElement {
//   name: string;
//   pid: string;
//   country: string;
//   category: string;
// }

var ELEMENT_DATA: Product[] = [];


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['pid', 'name', 'country', 'category', 'weight'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.showProductData();
  }
  constructor(private productService: ProductService, private router: Router) {}

  @Input()
  error!: string | null;
  
  ngOnInit(): void {
  }

  showProductData() {
    this.productService.getProductData().subscribe(
      (productData) => {
        console.log("get data");
        ELEMENT_DATA = [];
        for (const data of (productData as Product[])){
          console.log(data);
          ELEMENT_DATA.push(
            // {
            //   name: data.name,
            //   pid: data.pid,
            //   country: data.country,
            //   category: data.category
            // }
            data
          )
        }
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
        if (err.status == 401) {
          this.router.navigate(['/auth']);
        }
        
      }
    );    
  }

  newProduct(form:FormGroup) {
    console.log(form);
  }
}
