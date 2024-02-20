import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type CartId = string;
export interface CartItem {
  'id' : CartId,
  'time_created' : Time,
  'principal' : Principal,
  'product_slug' : string,
  'time_updated' : Time,
  'quantity' : number,
}
export interface Category {
  'category_img' : ImgId,
  'name' : string,
  'slug' : SlugId,
}
export interface Contact {
  'id' : ContactId,
  'time_created' : Time,
  'name' : string,
  'email' : string,
  'time_updated' : Time,
  'contact_number' : number,
  'message' : string,
}
export type ContactId = string;
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
export type GetCategoryError = { 'CategoryNotFound' : null };
export type GetContactError = { 'UserNotAdmin' : null } |
  { 'ContactNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type GetProductError = { 'ProductNotFound' : null };
export type GetUserError = { 'UserNotFound' : null };
export type GetVariantError = { 'VariantNotFound' : null };
export type ImgId = string;
export interface NewOrder {
  'awb' : string,
  'paymentStatus' : string,
  'paymentMethod' : string,
  'shippingAmount' : number,
  'orderStatus' : string,
  'userid' : Principal,
  'paymentAddress' : string,
  'totalAmount' : number,
  'shippingAddress' : ShippingAddress,
  'products' : Array<OrderProduct>,
  'subTotalAmount' : number,
}
export interface Order {
  'id' : OrderId,
  'awb' : string,
  'timeUpdated' : Time,
  'paymentStatus' : string,
  'paymentMethod' : string,
  'shippingAmount' : number,
  'orderStatus' : string,
  'userid' : Principal,
  'paymentAddress' : string,
  'timeCreated' : Time,
  'totalAmount' : number,
  'shippingAddress' : ShippingAddress,
  'products' : Array<OrderProduct>,
  'subTotalAmount' : number,
}
export type OrderError = { 'PaymentAddressAlreadyUsed' : null } |
  { 'OrderNotFound' : null } |
  { 'MissingData' : null } |
  { 'UnableToCreate' : null } |
  { 'UnableToUpdate' : null };
export type OrderId = string;
export interface OrderProduct { 'id' : ProductId, 'quantity' : number }
export interface Product {
  'id' : ProductId,
  'img' : ImgId,
  'time_created' : Time,
  'title' : string,
  'active' : boolean,
  'slug' : SlugId,
  'sellingPrice' : number,
  'description' : string,
  'trending' : boolean,
  'newArrival' : boolean,
  'time_updated' : Time,
  'category' : SlugId,
  'price' : number,
}
export type ProductId = bigint;
export type Result = { 'ok' : Variants } |
  { 'err' : UpdateVariantError };
export type Result_1 = { 'ok' : WishlistItem } |
  { 'err' : UpdateWishlistItemError };
export type Result_10 = { 'ok' : Product } |
  { 'err' : GetProductError };
export type Result_11 = { 'ok' : Order } |
  { 'err' : OrderError };
export type Result_12 = { 'ok' : Contact } |
  { 'err' : GetContactError };
export type Result_13 = { 'ok' : Category } |
  { 'err' : GetCategoryError };
export type Result_14 = { 'ok' : null } |
  { 'err' : DeleteVariantError };
export type Result_15 = { 'ok' : null } |
  { 'err' : DeleteWishlistItemError };
export type Result_16 = { 'ok' : null } |
  { 'err' : DeleteProductError };
export type Result_17 = { 'ok' : null } |
  { 'err' : DeleteOrderError };
export type Result_18 = { 'ok' : null } |
  { 'err' : DeleteContactError };
export type Result_19 = { 'ok' : null } |
  { 'err' : DeleteCategoryError };
export type Result_2 = { 'ok' : User } |
  { 'err' : UpdateUserError };
export type Result_20 = { 'ok' : null } |
  { 'err' : DeleteCartItemsError };
export type Result_21 = { 'ok' : Variants } |
  { 'err' : CreateVariantError };
export type Result_22 = { 'ok' : Product } |
  { 'err' : CreateProductError };
export type Result_23 = { 'ok' : Contact } |
  { 'err' : CreateContactError };
export type Result_24 = { 'ok' : Category } |
  { 'err' : CreateCategoryError };
export type Result_25 = { 'ok' : WishlistItem } |
  { 'err' : CreateWishlistItemError };
export type Result_26 = { 'ok' : CartItem } |
  { 'err' : CreateCartItemsError };
export type Result_3 = { 'ok' : Order } |
  { 'err' : UpdateOrderError };
export type Result_4 = { 'ok' : Product } |
  { 'err' : UpdateProductError };
export type Result_5 = { 'ok' : Contact } |
  { 'err' : UpdateContactError };
export type Result_6 = { 'ok' : Category } |
  { 'err' : UpdateCategoryError };
export type Result_7 = { 'ok' : CartItem } |
  { 'err' : UpdateCartItemsError };
export type Result_8 = { 'ok' : Variants } |
  { 'err' : GetVariantError };
export type Result_9 = { 'ok' : User } |
  { 'err' : GetUserError };
export interface ShippingAddress {
  'postCode' : string,
  'street' : string,
  'country' : string,
  'city' : string,
  'mail' : string,
  'county' : string,
  'lastName' : string,
  'firstName' : string,
}
export type SlugId = string;
export type Time = bigint;
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
export interface User {
  'id' : Principal,
  'email' : string,
  'FirstName' : string,
  'LastName' : string,
}
export interface UserContact {
  'name' : string,
  'email' : string,
  'contact_number' : number,
  'message' : string,
}
export interface UserProduct {
  'title' : string,
  'active' : boolean,
  'sellingPrice' : number,
  'description' : string,
  'trending' : boolean,
  'newArrival' : boolean,
  'category' : SlugId,
  'price' : number,
}
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
export interface _SERVICE {
  'addtoCartItems' : ActorMethod<[string, number], Result_26>,
  'addtoWishlist' : ActorMethod<[string], Result_25>,
  'createCategory' : ActorMethod<[string, ImgId], Result_24>,
  'createContact' : ActorMethod<[UserContact], Result_23>,
  'createOrder' : ActorMethod<[NewOrder], Result_11>,
  'createProduct' : ActorMethod<
    [UserProduct, [] | [Uint8Array | number[]]],
    Result_22
  >,
  'createVariant' : ActorMethod<
    [SlugId, string, string, bigint, number, number],
    Result_21
  >,
  'deleteCartItems' : ActorMethod<[CartId], Result_20>,
  'deleteCategory' : ActorMethod<[SlugId], Result_19>,
  'deleteContact' : ActorMethod<[ContactId], Result_18>,
  'deleteOrder' : ActorMethod<[OrderId], Result_17>,
  'deleteProduct' : ActorMethod<[SlugId], Result_16>,
  'deleteWishlistItems' : ActorMethod<[WishlistId], Result_15>,
  'deletevariant' : ActorMethod<[SlugId], Result_14>,
  'getCallerCartItems' : ActorMethod<[], Array<[CartId, CartItem]>>,
  'getCategory' : ActorMethod<[SlugId], Result_13>,
  'getContact' : ActorMethod<[ContactId], Result_12>,
  'getOrder' : ActorMethod<[string], Result_11>,
  'getProduct' : ActorMethod<[SlugId], Result_10>,
  'getUserdetailsbycaller' : ActorMethod<[], Result_9>,
  'getUserdetailsbyid' : ActorMethod<[Principal], Result_9>,
  'getvariant' : ActorMethod<[SlugId], Result_8>,
  'listCategories' : ActorMethod<[], Array<[SlugId, Category]>>,
  'listContacts' : ActorMethod<[], Array<[ContactId, Contact]>>,
  'listUserOrders' : ActorMethod<[], Array<[OrderId, Order]>>,
  'listUsers' : ActorMethod<[], Array<[Principal, User]>>,
  'listWishlistItems' : ActorMethod<[], Array<[WishlistId, WishlistItem]>>,
  'listallOrders' : ActorMethod<[], Array<[OrderId, Order]>>,
  'listallProducts' : ActorMethod<[], Array<[SlugId, Product]>>,
  'searchproductsbycategory' : ActorMethod<[SlugId], Array<[SlugId, Product]>>,
  'searchproductsbytitle' : ActorMethod<[string], Array<[SlugId, Product]>>,
  'updateCartItems' : ActorMethod<[CartId, number], Result_7>,
  'updateCategory' : ActorMethod<[SlugId, string, ImgId], Result_6>,
  'updateContact' : ActorMethod<[ContactId, boolean], Result_5>,
  'updateOrderStatus' : ActorMethod<[OrderId, string], Result_3>,
  'updateProduct' : ActorMethod<
    [SlugId, UserProduct, [] | [Uint8Array | number[]]],
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
