import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ProductCategory} from "../common/product-category";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = 'http://localhost:8082/api';
    // private baseUrl = 'http://localhost:8082/api/products?size=100';

    constructor(private httpClient: HttpClient) {
    }

    getProductList(): Observable<Product[]> {
        return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
            map(response => response._embedded.products)
        )
    }

    getProductListBySearch(theCategoryId: number): Observable<Product[]> {
        return this.httpClient.get<GetResponseProducts>(`${this.baseUrl}/products/search/findByCategoryId?id=${theCategoryId}`).pipe(
            map(response => response._embedded.products)
        )
    }

    getProductCategories(): Observable<ProductCategory[]> {
        return this.httpClient.get<GetResponseProductCategory>(`${this.baseUrl}/product-category`).pipe(
            map(response => response._embedded.productCategory)
        )
    }

    searchProducts(theKeyword: string) : Observable<Product[]> {
        return this.httpClient.get<GetResponseProducts>(`${this.baseUrl}/products/search/findByNameContaining?name=${theKeyword}`).pipe(
            map(response => response._embedded.products)
        )
    }
}

interface GetResponseProducts {
    _embedded: {
        products: Product[];
    }
}

interface GetResponseProductCategory {
    _embedded: {
        productCategory: ProductCategory[];
    }
}
