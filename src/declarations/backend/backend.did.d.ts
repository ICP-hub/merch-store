import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Address {
  'id' : string,
  'firstname' : string,
  'country' : string,
  'city' : string,
  'email' : string,
  'state' : string,
  'address_type' : string,
  'phone_number' : string,
  'pincode' : string,
  'lastname' : string,
  'addressline1' : string,
  'addressline2' : string,
}
export type CartId = string;
export interface CartItem {
  'id' : CartId,
  'time_created' : Time,
  'principal' : Principal,
  'color' : string,
  'size' : string,
  'product_slug' : string,
  'time_updated' : Time,
  'quantity' : number,
}
export interface Category {
  'featured' : boolean,
  'category_img' : string,
  'name' : string,
  'slug' : SlugId,
}
export interface Contact {
  'id' : ContactId,
  'time_created' : Time,
  'name' : string,
  'email' : string,
  'time_updated' : Time,
  'contact_number' : string,
  'message' : string,
}
export type ContactId = string;
export type CreateAddressError = { 'EmptyCountry' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyCity' : null } |
  { 'EmptyPhoneNumber' : null } |
  { 'EmptyLastName' : null } |
  { 'EmptyAddressLine1' : null } |
  { 'EmptyFirstName' : null } |
  { 'EmptyEmail' : null } |
  { 'EmptyPincode' : null } |
  { 'EmptyState' : null };
export type CreateCartItemsError = { 'UserNotAdmin' : null } |
  { 'EmptyProductSlug' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'ProductSlugAlreadyExists' : null } |
  { 'EmptySize' : null } |
  { 'EmptyColor' : null };
export type CreateCategoryError = { 'UserNotAdmin' : null } |
  { 'CategoryAlreadyExists' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyName' : null };
export type CreateContactError = { 'EmptyName' : null } |
  { 'EmptyMessage' : null } |
  { 'EmptyEmail' : null };
export type CreateProductError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyTitle' : null };
export type CreateVariantError = { 'VariantSlugAlreadyExists' : null } |
  { 'UserNotAdmin' : null } |
  { 'ProductSlugNotFound' : null } |
  { 'EmptyProductSlug' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptySize' : null } |
  { 'EmptyColor' : null };
export type CreateWishlistItemError = { 'UserNotAdmin' : null } |
  { 'EmptyProductSlug' : null } |
  { 'WishlistItemAlreadyExists' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteAddressError = { 'UserNotAuthenticated' : null } |
  { 'AddressNotFound' : null };
export type DeleteCartItemsError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteCategoryError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteContactError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteOrderError = { 'UserNotAdmin' : null } |
  { 'OrderNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteProductError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteVariantError = { 'UserNotAdmin' : null } |
  { 'VariantNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type DeleteWishlistItemError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type GetAddressError = { 'AddressNotFound' : null };
export type GetCategoryError = { 'CategoryNotFound' : null };
export type GetContactError = { 'UserNotAdmin' : null } |
  { 'ContactNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type GetPaymentStatusError = { 'OrderNotFound' : null };
export type GetProductError = { 'ProductNotFound' : null };
export type GetStatisticalDetailError = { 'UserNotAdmin' : null };
export type GetUserError = { 'UserNotFound' : null };
export type GetVariantError = { 'VariantNotFound' : null };
export interface NewOrder {
  'awb' : string,
  'paymentStatus' : string,
  'paymentMethod' : string,
  'shippingAmount' : shippingAmount,
  'orderStatus' : string,
  'userid' : Principal,
  'paymentAddress' : string,
  'totalAmount' : number,
  'shippingAddress' : Address,
  'products' : Array<OrderProduct>,
  'subTotalAmount' : number,
}
export interface Order {
  'id' : OrderId,
  'awb' : string,
  'timeUpdated' : Time,
  'paymentStatus' : string,
  'paymentMethod' : string,
  'shippingAmount' : shippingAmount,
  'orderStatus' : string,
  'userid' : Principal,
  'paymentAddress' : string,
  'timeCreated' : Time,
  'totalAmount' : number,
  'shippingAddress' : Address,
  'products' : Array<OrderProduct>,
  'subTotalAmount' : number,
}
export type OrderError = { 'PaymentAddressAlreadyUsed' : null } |
  { 'OrderNotFound' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'MissingData' : null } |
  { 'UnableToCreate' : null } |
  { 'UnableToUpdate' : null };
export type OrderId = string;
export interface OrderProduct {
  'id' : string,
  'img' : string,
  'title' : string,
  'color' : string,
  'size' : string,
  'sale_price' : number,
  'quantity' : number,
}
export interface Product {
  'id' : ProductId,
  'time_created' : Time,
  'title' : string,
  'variantColor' : Array<VariantColor>,
  'active' : boolean,
  'slug' : SlugId,
  'description' : string,
  'variantSize' : Array<VariantSize>,
  'trending' : boolean,
  'newArrival' : boolean,
  'time_updated' : Time,
  'category' : SlugId,
}
export type ProductId = bigint;
export type Result = { 'ok' : Variants } |
  { 'err' : UpdateVariantError };
export type Result_1 = { 'ok' : WishlistItem } |
  { 'err' : UpdateWishlistItemError };
export type Result_10 = { 'ok' : Variants } |
  { 'err' : GetVariantError };
export type Result_11 = { 'ok' : StatisticalDetail } |
  { 'err' : GetStatisticalDetailError };
export type Result_12 = { 'ok' : string } |
  { 'err' : GetPaymentStatusError };
export type Result_13 = { 'ok' : User } |
  { 'err' : GetUserError };
export type Result_14 = { 'ok' : Product } |
  { 'err' : GetProductError };
export type Result_15 = { 'ok' : Order } |
  { 'err' : OrderError };
export type Result_16 = { 'ok' : Contact } |
  { 'err' : GetContactError };
export type Result_17 = { 'ok' : Category } |
  { 'err' : GetCategoryError };
export type Result_18 = { 'ok' : Address } |
  { 'err' : GetAddressError };
export type Result_19 = { 'ok' : null } |
  { 'err' : DeleteVariantError };
export type Result_2 = { 'ok' : User } |
  { 'err' : UpdateUserError };
export type Result_20 = { 'ok' : null } |
  { 'err' : DeleteAddressError };
export type Result_21 = { 'ok' : null } |
  { 'err' : DeleteWishlistItemError };
export type Result_22 = { 'ok' : null } |
  { 'err' : DeleteProductError };
export type Result_23 = { 'ok' : null } |
  { 'err' : DeleteOrderError };
export type Result_24 = { 'ok' : null } |
  { 'err' : DeleteContactError };
export type Result_25 = { 'ok' : null } |
  { 'err' : DeleteCategoryError };
export type Result_26 = { 'ok' : null } |
  { 'err' : DeleteCartItemsError };
export type Result_27 = { 'ok' : Variants } |
  { 'err' : CreateVariantError };
export type Result_28 = { 'ok' : Product } |
  { 'err' : CreateProductError };
export type Result_29 = { 'ok' : Contact } |
  { 'err' : CreateContactError };
export type Result_3 = { 'ok' : Order } |
  { 'err' : UpdateOrderError };
export type Result_30 = { 'ok' : Category } |
  { 'err' : CreateCategoryError };
export type Result_31 = { 'ok' : Address } |
  { 'err' : CreateAddressError };
export type Result_32 = { 'ok' : WishlistItem } |
  { 'err' : CreateWishlistItemError };
export type Result_33 = { 'ok' : CartItem } |
  { 'err' : CreateCartItemsError };
export type Result_4 = { 'ok' : Product } |
  { 'err' : UpdateProductError };
export type Result_5 = { 'ok' : Order } |
  { 'err' : UpdatepaymentStatusError };
export type Result_6 = { 'ok' : Contact } |
  { 'err' : UpdateContactError };
export type Result_7 = { 'ok' : Category } |
  { 'err' : UpdateCategoryError };
export type Result_8 = { 'ok' : CartItem } |
  { 'err' : UpdateCartItemsError };
export type Result_9 = { 'ok' : Address } |
  { 'err' : UpdateAddressError };
export type SlugId = string;
export interface StatisticalDetail {
  'totalProducts' : bigint,
  'totalOrders' : bigint,
  'totalContacts' : bigint,
  'totalUsers' : bigint,
  'totalCategories' : bigint,
}
export type Time = bigint;
export type UpdateAddressError = { 'EmptyCountry' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyCity' : null } |
  { 'EmptyPhoneNumber' : null } |
  { 'EmptyLastName' : null } |
  { 'EmptyAddressLine1' : null } |
  { 'AddressNotFound' : null } |
  { 'EmptyFirstName' : null } |
  { 'EmptyEmail' : null } |
  { 'EmptyPincode' : null } |
  { 'EmptyState' : null };
export type UpdateCartItemsError = { 'UserNotAdmin' : null } |
  { 'CartItemNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type UpdateCategoryError = { 'UserNotAdmin' : null } |
  { 'CategoryNotFound' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyName' : null };
export type UpdateContactError = { 'UserNotAdmin' : null } |
  { 'ContactNotFound' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyName' : null } |
  { 'EmptyMessage' : null } |
  { 'EmptyEmail' : null };
export type UpdateOrderError = { 'UserNotAdmin' : null } |
  { 'OrderNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type UpdateProductError = { 'UserNotAdmin' : null } |
  { 'ProductNotFound' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyTitle' : null };
export type UpdateUserError = { 'UserNotAuthenticated' : null } |
  { 'EmptyLastName' : null } |
  { 'EmptyFirstName' : null } |
  { 'EmptyEmail' : null } |
  { 'UserNotFound' : null };
export type UpdateVariantError = { 'UserNotAdmin' : null } |
  { 'ProductSlugNotFound' : null } |
  { 'EmptyProductSlug' : null } |
  { 'VariantNotFound' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptySize' : null } |
  { 'EmptyColor' : null };
export type UpdateWishlistItemError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'WishlistItemNotFound' : null };
export type UpdatepaymentStatusError = { 'UserNotAdmin' : null } |
  { 'OrderNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export interface User {
  'id' : Principal,
  'email' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface UserAddress {
  'firstname' : string,
  'country' : string,
  'city' : string,
  'email' : string,
  'state' : string,
  'address_type' : string,
  'phone_number' : string,
  'pincode' : string,
  'lastname' : string,
  'addressline1' : string,
  'addressline2' : string,
}
export interface UserContact {
  'name' : string,
  'email' : string,
  'contact_number' : string,
  'message' : string,
}
export interface UserProduct {
  'title' : string,
  'active' : boolean,
  'description' : string,
  'trending' : boolean,
  'newArrival' : boolean,
  'category' : SlugId,
}
export interface VariantColor {
  'img1' : string,
  'img2' : string,
  'img3' : string,
  'inventory' : bigint,
  'color' : string,
  'variant_price' : number,
  'variant_sale_price' : number,
}
export interface VariantSize { 'size' : string }
export interface Variants {
  'variant_slug' : SlugId,
  'inventory' : bigint,
  'color' : string,
  'size' : string,
  'variant_price' : number,
  'product_slug' : SlugId,
  'variant_sale_price' : number,
}
export type WishlistId = string;
export interface WishlistItem {
  'id' : WishlistId,
  'time_created' : Time,
  'principal' : Principal,
  'product_slug' : string,
  'time_updated' : Time,
}
export interface shippingAmount { 'shipping_amount' : number }
export interface _SERVICE {
  'addtoCartItems' : ActorMethod<[string, string, string, number], Result_33>,
  'addtoWishlist' : ActorMethod<[string], Result_32>,
  'clearallcartitmesbyprincipal' : ActorMethod<[], Result_26>,
  'createAddress' : ActorMethod<[UserAddress], Result_31>,
  'createCategory' : ActorMethod<[string, string, boolean], Result_30>,
  'createContact' : ActorMethod<[UserContact], Result_29>,
  'createOrder' : ActorMethod<[NewOrder], Result_15>,
  'createProduct' : ActorMethod<
    [UserProduct, Array<VariantSize>, Array<VariantColor>],
    Result_28
  >,
  'createVariant' : ActorMethod<
    [SlugId, string, string, bigint, number, number],
    Result_27
  >,
  'deleteCartItems' : ActorMethod<[CartId], Result_26>,
  'deleteCategory' : ActorMethod<[SlugId], Result_25>,
  'deleteContact' : ActorMethod<[ContactId], Result_24>,
  'deleteOrder' : ActorMethod<[OrderId], Result_23>,
  'deleteProduct' : ActorMethod<[SlugId], Result_22>,
  'deleteWishlistItems' : ActorMethod<[WishlistId], Result_21>,
  'deleteaddress' : ActorMethod<[string], Result_20>,
  'deletevariant' : ActorMethod<[SlugId], Result_19>,
  'getAddress' : ActorMethod<[string], Result_18>,
  'getCallerCartItems' : ActorMethod<[], Array<[CartId, CartItem]>>,
  'getCategory' : ActorMethod<[SlugId], Result_17>,
  'getContact' : ActorMethod<[ContactId], Result_16>,
  'getOrder' : ActorMethod<[string], Result_15>,
  'getProduct' : ActorMethod<[SlugId], Result_14>,
  'getUserdetailsbycaller' : ActorMethod<[], Result_13>,
  'getUserdetailsbyid' : ActorMethod<[Principal], Result_13>,
  'getpaymentstatus' : ActorMethod<[], Result_12>,
  'getstatisticaldetailforadmin' : ActorMethod<[], Result_11>,
  'getvariant' : ActorMethod<[SlugId], Result_10>,
  'isAdmin' : ActorMethod<[Principal], boolean>,
  'listCategories' : ActorMethod<[], Array<[SlugId, Category]>>,
  'listContacts' : ActorMethod<[], Array<[ContactId, Contact]>>,
  'listUserAddresses' : ActorMethod<[], Array<[Principal, Array<Address>]>>,
  'listUserOrders' : ActorMethod<[], Array<[OrderId, Order]>>,
  'listUsers' : ActorMethod<[], Array<[Principal, User]>>,
  'listWishlistItems' : ActorMethod<[], Array<[WishlistId, WishlistItem]>>,
  'listallOrders' : ActorMethod<[], Array<[OrderId, Order]>>,
  'listallProducts' : ActorMethod<[], Array<[SlugId, Product]>>,
  'searchproductsbycategory' : ActorMethod<[SlugId], Array<[SlugId, Product]>>,
  'searchproductsbytitle' : ActorMethod<[string], Array<[SlugId, Product]>>,
  'updateAddress' : ActorMethod<[Address, string, Principal], Result_9>,
  'updateCartItems' : ActorMethod<[CartId, number, string, string], Result_8>,
  'updateCategory' : ActorMethod<[SlugId, string, string, boolean], Result_7>,
  'updateContact' : ActorMethod<[ContactId, boolean], Result_6>,
  'updateOrderStatus' : ActorMethod<[OrderId, string], Result_3>,
  'updatePaymentstatus' : ActorMethod<[OrderId, string], Result_5>,
  'updateProduct' : ActorMethod<
    [SlugId, UserProduct, Array<VariantSize>, Array<VariantColor>],
    Result_4
  >,
  'updateTrackingUrl' : ActorMethod<[OrderId, string], Result_3>,
  'updateUser' : ActorMethod<[string, string, string], Result_2>,
  'updateWishlistItems' : ActorMethod<[WishlistId], Result_1>,
  'updatevariant' : ActorMethod<
    [SlugId, string, string, bigint, number, number],
    Result
  >,
}
