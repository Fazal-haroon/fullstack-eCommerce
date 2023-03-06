import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopFormService} from "../../services/shop-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";
import {ShopValidators} from "../../validators/shop-validators";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder, private shopFormService: ShopFormService) { // Inject our form service
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        country: new FormControl('', [Validators.required])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        country: new FormControl('', [Validators.required])
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    })

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1; // Get the current month is 0-based
    console.log("startMonth: " + startMonth);

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
        data => {
          console.log("Retrieved credit card months: " + JSON.stringify(data));
          this.creditCardMonths = data;
        }
    )

    // populate credit card years
    this.shopFormService.getCreditCardYears().subscribe(
        data => {
          console.log("Retrieved credit card years: " + JSON.stringify(data));
          this.creditCardYears = data;
        }
    )

    //populate countries
    this.shopFormService.getCountries().subscribe(
        data => {
          console.log("Retrieved countries: " + JSON.stringify(data));
          this.countries = data;
        }
    )

  }

  onSubmit(){
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched(); //Touching all fields triggers the display of the error messages
    }

    console.log(this.checkoutFormGroup.get('customer').value)
    console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email)
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress').value.country.name)
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name)
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      //Bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    //if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
        data => {
          console.log("Retrieved credit card months: " + JSON.stringify(data));
          this.creditCardMonths = data;
        }
    )
  }

  getStates(shippingAddress: string) {
    const formGroup = this.checkoutFormGroup.get(shippingAddress)

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${shippingAddress} country code: ${countryCode}`)
    console.log(`${shippingAddress} country name: ${countryName}`)

    this.shopFormService.getStates(countryCode).subscribe(
        data => {
            console.log("Retrieved countries: " + JSON.stringify(data));
          if (shippingAddress === 'shippingAddress') {
            this.shippingAddressStates = data
          } else {
            this.billingAddressStates = data
          }

          //select first item by default
          formGroup.get('state').setValue(data[0]);
        }
    )
  }

  get getFirstName() { return this.checkoutFormGroup.get('customer.firstName'); }

  get getLastName() { return this.checkoutFormGroup.get('customer.lastName'); }

  get getEmail() { return this.checkoutFormGroup.get('customer.email'); }

  get getShippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }

  get getShippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }

  get getShippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }

  get getShippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  get getShippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get getBillingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }

  get getBillingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }

  get getBillingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }

  get getBillingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

  get getBillingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

}
