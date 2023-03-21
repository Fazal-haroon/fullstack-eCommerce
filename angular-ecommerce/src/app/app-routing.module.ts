import {Injector, NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {CartDetailsComponent} from "./components/cart-details/cart-details.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {OktaAuthGuard, OktaCallbackComponent} from "@okta/okta-angular";
import {LoginComponent} from "./components/login/login.component";
import {MembersPageComponent} from "./components/members-page/members-page.component";
import {OktaAuth} from "@okta/okta-auth-js";
import {OrderHistoryComponent} from "./components/order-history/order-history.component";

// Welcome to Route
function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector){
    //Use injector to access any service available within your application
    const router = injector.get(Router);

    //Redirect the user to your custom login page
    router.navigate(['/login']);
}
const routes: Routes = [
    {path: 'category/:id', component: ProductListComponent},
    {path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
    {path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
    {path: 'login/callback', component: OktaCallbackComponent}, //Once the user is authenticated, they are redirected to your app. Normally you would need to parse the response and store the OAuth+OIDC tokens. The OktaCallbackComponent does this for you.
    {path: 'login', component: LoginComponent},
    {path: 'search/:keyword', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'cart-details', component: CartDetailsComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: '', redirectTo: '/products', pathMatch: "full"},
    {path: '**', redirectTo: '/products', pathMatch: "full"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
