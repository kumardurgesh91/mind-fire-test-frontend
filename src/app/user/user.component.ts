import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AppService } from '../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  error;
  loading;
  products = [];
  productForm: FormGroup;
  selectedProduct;
  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getProduct();
    this.productForm = new FormGroup({
      name: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32)
        ]
      }),
      price: new FormControl('', {
        validators: [
          Validators.required,
        ]
      }),
      rating: new FormControl('', {
        validators: [
          Validators.required,
        ]
      })
    });
  }

  getProduct() {
    this.loading = true;
    this.appService.getProduct()
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe(products => {
      this.products = products;
    }, err => {

    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  currentProduct(p) {
    this.selectedProduct = {...p};
    this.productForm.controls['name'].setValue(this.selectedProduct.name);
    this.productForm.controls['price'].setValue(this.selectedProduct.price);
    this.productForm.controls['rating'].setValue(this.selectedProduct.rating);
  }

  resetSelectedProduct() {
    this.selectedProduct = {};
    this.productForm.controls['name'].reset();
    this.productForm.controls['price'].reset();
    this.productForm.controls['rating'].reset();
  }

  addProduct() {
    this.loading = true;
    const product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      rating: this.productForm.value.rating
    };
    this.appService.addProduct(product)
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe(product => {
      this.products.push(product);
      this.resetSelectedProduct();
    }, err => {
      alert(err.error.error);
    });
  }

  deleteProduct() {
    this.loading = true;
    const productId = this.selectedProduct._id;
    this.appService.delete(productId)
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe(isSaved => {
      for (let i = 0; i < this.products.length; i++) {
        if (productId === this.products[i]._id) {
          this.products.splice(i, 1);
          break;
        }
      }
      this.resetSelectedProduct();
    }, err => {
      alert(err.error.error);
    });
  }

  saveProduct() {
    this.loading = true;
    const product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      rating: this.productForm.value.rating
    };
    const productId = this.selectedProduct._id;

    this.appService.updateProduct(product, productId)
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe(isSaved => {
      for (const p of this.products) {
        if (productId === p._id) {
          p.name = product.name;
          p.rating = product.rating;
          p.price = product.price;
        }
      }
    }, err => {
      alert(err.error.error);
    });
  }

}
