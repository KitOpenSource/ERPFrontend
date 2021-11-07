import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  displayedColumns: string[] = ['pid', 'name', 'country', 'category', 'weight', 'info'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  searchCtl = new FormControl('');

  @Output() editEM = new EventEmitter<Product>();

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

  doFilter(event: Event) {
    this.dataSource.filter = this.searchCtl.value.trim().toLocaleLowerCase();
  }

  showProductData() {
    this.productService.getProductData().subscribe(
      (productData) => {
        console.log("get data");
        ELEMENT_DATA = [];
        for (let data of (productData as Product[])){
          let product = new Product();
          product._id = data._id;
          product.pid = data.pid;
          product.name = data.name;
          product.country = data.country;
          product.category = data.category;
          product.gross_weight = data.gross_weight;

          ELEMENT_DATA.push(product);
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

  edit(product:Product) {
    this.editEM.emit(product);
  }
}
