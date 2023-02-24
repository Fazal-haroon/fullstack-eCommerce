import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list-grid.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: Product[] = [];
    currentCategoryId: number = 1;
    previousCategoryId: number = 1;
    searchMode: boolean = false;

    //New properties for pagination
    thePageNumber: number = 1;
    thePageSize: number = 5;
    theTotalElements: number = 0;

    previousKeyword: string = "";

    constructor(private productService: ProductService, private route: ActivatedRoute) {
    }

    ngOnInit(): void { //Similar to @PostConstruct
        this.route.paramMap.subscribe(() => {
            this.listProducts();
        });
    }

    listProducts() {

        this.searchMode = this.route.snapshot.paramMap.has('keyword');

        if(this.searchMode){
            this.handleSearchProducts();
        } else {
            this.handleListProducts();
        }

    }

    handleListProducts() {
        // check if "id" parameter is available
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

        if(hasCategoryId){
            //get the "id" param string, convert string to a number using the "+" symbol
            this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
        } else {
            //not category id available ... default to category id 1
            this.currentCategoryId = 1;
        }

        // this.productService.getProductList().subscribe(
        //     data => {
        //         this.products = data;
        //     }
        // )

        /*//now get the products for the given category id
        this.productService.getProductListBySearchCategoryId(this.currentCategoryId).subscribe(
            data => {
                this.products = data;
            }
        )*/

        if(this.previousCategoryId != this.currentCategoryId){
            this.thePageNumber = 1;
        }
        this.previousCategoryId = this.currentCategoryId;
        console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

        //now get the products for the given category id
        this.productService.getProductListBySearchCategoryIdPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(
            this.processResult()
        )
    }


    handleSearchProducts() {
        const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

        //if we have different keyword than pervious
        //then set thePageNumber to 1
        if (this.previousKeyword != theKeyword) {
            this.thePageNumber = 1
        }

        this.previousKeyword = theKeyword;

        console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`)

        this.productService.searchProductsPaginate(this.thePageNumber -1, this.thePageSize, theKeyword).subscribe(
            this.processResult()
        )
        // //now search for the products using keyword
        // this.productService.searchProducts(theKeyword).subscribe(
        //     data => {
        //         this.products = data;
        //     }
        // );
    }

    updatePageSize(pageSize: string) {
        this.thePageSize = +pageSize;
        this.thePageNumber = 1;
        this.listProducts();
    }

    processResult() {
        return (data: any) => {
            this.products = data._embedded.products;
            this.thePageNumber = data.page.number + 1;
            this.thePageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;
        }
    }

    addToCart(tempProduct: Product) {
        console.log(`Adding to cart: ${tempProduct.name}, ${tempProduct.unitPrice}`)
    }
}
