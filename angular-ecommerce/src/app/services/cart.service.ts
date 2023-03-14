import {Injectable} from '@angular/core';
import {CartItem} from "../common/cart-item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cartItems: CartItem[] = [];

    totalPrice: Subject<number> = new BehaviorSubject<number>(0); //Subject is a subclass of Observable,
    //We can use Subject to publish events in our code. The event will be sent to all the subscribers.
    totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
    //Subject: Does not keep a buffer of previous events
    // Subscriber only receives new events after they are subscribed
    //ReplaySubject: Has a buffer of all previous events
    // Once subscribed, subscriber receives a replay of all previous events
    //BehaviorSubject: Has a buffer of the last event
    // Once subscribed, subscriber receives the latest event sent prior to subscribing

    storage: Storage = sessionStorage; //Reference to web browser's session storage, after restart data lose
    // storage: Storage = localStorage; //use localStorage instead of sessionStorage
    //LocalStorage: data is persisted and survives browser restarts

    constructor() {
        //read data from storage
        let data = JSON.parse(this.storage.getItem('cartItems')!) //Reads JSON string and converts to object

        if(data != null){
            this.cartItems = data;

            //compute totals based on the data that is read from storage
            this.computeCartTotals();

        }
    }

    addToCart(theCartItem: CartItem) {
        //check if we already have the item in our cart
        let alreadyExistsInCart: boolean = false;
        let existingCartItem: CartItem = undefined;

        if (this.cartItems.length > 0) {
            //find the item in the cart based on item id
            /*for(let tempCartItem of this.cartItems){
              if(tempCartItem.id === theCartItem.id){
                existingCartItem = tempCartItem;
                break;
              }
            }*/
            existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id); //returns first element that passes else returns undefined, executes test for each element in the array until test passes
            //check if we found it
            alreadyExistsInCart = (existingCartItem != undefined);
        }

        if (alreadyExistsInCart) {
            //increment the quantity
            existingCartItem.quantity++;
        } else {
            //just add the item to the array
            this.cartItems.push(theCartItem);
        }

        //compute cart total price and total quantity
        this.computeCartTotals();
    }

    computeCartTotals() {
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        for (let currentCartItem of this.cartItems) {
            totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
            totalQuantityValue += currentCartItem.quantity;
        }

        //publish the new values ... all subscribers will receive the new data
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue); //this will publish events to all subscribers, one event for totalPrice one event for totalQuantity
        // .next(...) publish/send event

        //log cart data just for debugging purposes
        this.logCartData(totalPriceValue, totalQuantityValue);

        //persist cart data
        this.persistCartItems();
        //sessionStorage: Once a web browser tab is closed then data is no longer available
    }

    private logCartData = (totalPriceValue: number, totalQuantityValue: number) => {
        console.log('Contents of the Cart')
        for (let tempCartItem of this.cartItems) {
            const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
            console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
        }

        console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`) //two digits after decimal 124.98
        console.log('----------')
    }

    /*decrementCartQuantity(theCartItem: CartItem) {
        let alreadyExistsInCart: boolean = false;
        let existingCartItem: CartItem = undefined;

        if (this.cartItems.length > 0) {
            //find the item in the cart based on item id
            /!*for(let tempCartItem of this.cartItems){
              if(tempCartItem.id === theCartItem.id){
                existingCartItem = tempCartItem;
                break;
              }
            }*!/
            existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id); //returns first element that passes else returns undefined, executes test for each element in the array until test passes
            //check if we found it
            alreadyExistsInCart = (existingCartItem != undefined);
        }

        if (alreadyExistsInCart) {
            //increment the quantity
            existingCartItem.quantity--;
        } else {
            //just add the item to the array
            this.cartItems.push(theCartItem);
        }

        //compute cart total price and total quantity
        this.computeCartTotals();
    }*/


    decrementCartQuantity(theCartItem: CartItem) {
        theCartItem.quantity--;
        if(theCartItem.quantity === 0){
            this.remove(theCartItem);
        }else {
            this.computeCartTotals();
        }
    }

    remove(theCartItem: CartItem) {
        //get index of item in the array
        const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

        //if found, remove the item from the array at the given index
        if(itemIndex > -1){
            this.cartItems.splice(itemIndex, 1);
            this.computeCartTotals();
        }
    }

    persistCartItems(){
        this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
}
