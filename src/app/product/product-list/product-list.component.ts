import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

var ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['pid', 'name', 'country', 'category', 'weight'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.showProductData();
  }

  showProductData() {
    this.productService.getProductData().subscribe(
      (productData) => {
        console.log("get data");
        ELEMENT_DATA = [];
        for (const data of (productData as Product[])){
          ELEMENT_DATA.push(data);
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

}
