import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { Product } from './product';
import { FormGroup } from '@angular/forms';
import { ProductCreateComponent } from './product-create/product-create.component';

// export interface PeriodicElement {
//   name: string;
//   pid: string;
//   country: string;
//   category: string;
// }

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  
  newError: string | null | undefined;
  newSuccess: string | null | undefined;
  editError: string | null | undefined;
  editSuccess: string | null | undefined;
  selectedIndex: number | undefined;

  selectedProduct: Product | undefined;

  // @ViewChild('tagForm') tagForm: ProductCreateComponent | undefined;


  constructor(private productService: ProductService, private router: Router) {}

  @Input()
  error!: string | null;
  
  ngOnInit(): void {
  }

  newProduct(form:any) {
    this.newError = null;
    this.newSuccess = null;
    this.productService.newProductData(form).subscribe(
      (productData) => {
        // console.log(productData);
        this.newSuccess = 'New product success';
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      },
      (err) => {
        console.log(err);
        if (err.status == 403) {
          this.newError = err.error.error;
          ;
        }
        else if (err.status == 401) {
          this.router.navigate(['/auth']);
        } else {
          this.newError = 'unknow error';
        }
      }
    ) 
  }

  editProduct(form:any) {
    this.editError = null;
    this.editSuccess = null;
    this.productService.editProductData(form).subscribe(
      (productData) => {
        this.editSuccess = 'Edit Product Success';
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      },
      (err) => {
        console.log(err);
        if (err.status == 403) {
          this.newError = err.error.error;
          ;
        }
        else if (err.status == 401) {
          this.router.navigate(['/auth']);
        } else {
          this.newError = 'unknow error';
        }
      }
    )
  }

  selectProdcut(product:Product) {
    //console.log(product);
    this.productService.getOneProductData(product._id).subscribe(
      (product) => {
        
        this.selectedProduct = product as Product;
        console.log(this.selectedProduct);
        this.selectedIndex = 2;
      },
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['/auth']);
        } else {
          console.log(err);
          this.newError = 'unknow error';
        }
      }
    )
  }

}
