import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type CartId = string;
export interface CartItem {
  'id' : CartId,
  'time_created' : Time,
  'principal' : Principal,
  'color' : color,
  'size' : size,
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
  'read' : boolean,
  'email' : string,
  'time_updated' : Time,
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
export type DeleteWishlistItemError = { 'UserNotAdmin' : null } |
  { 'UserNotAuthenticated' : null };
export type GetCategoryError = { 'CategoryNotFound' : null };
export type GetContactError = { 'UserNotAdmin' : null } |
  { 'ContactNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type GetProductError = { 'ProductNotFound' : null };
export type GetUserError = { 'UserNotFound' : null };
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
  'inventory' : bigint,
  'color' : color,
  'size' : size,
  'slug' : SlugId,
  'description' : string,
  'time_updated' : Time,
  'category' : SlugId,
  'price' : number,
}
export type ProductId = bigint;
export type Result = { 'ok' : WishlistItem } |
  { 'err' : UpdateWishlistItemError };
export type Result_1 = { 'ok' : User } |
  { 'err' : UpdateUserError };
export type Result_10 = { 'ok' : Contact } |
  { 'err' : GetContactError };
export type Result_11 = { 'ok' : Category } |
  { 'err' : GetCategoryError };
export type Result_12 = { 'ok' : null } |
  { 'err' : DeleteWishlistItemError };
export type Result_13 = { 'ok' : null } |
  { 'err' : DeleteProductError };
export type Result_14 = { 'ok' : null } |
  { 'err' : DeleteOrderError };
export type Result_15 = { 'ok' : null } |
  { 'err' : DeleteContactError };
export type Result_16 = { 'ok' : null } |
  { 'err' : DeleteCategoryError };
export type Result_17 = { 'ok' : null } |
  { 'err' : DeleteCartItemsError };
export type Result_18 = { 'ok' : Product } |
  { 'err' : CreateProductError };
export type Result_19 = { 'ok' : Contact } |
  { 'err' : CreateContactError };
export type Result_2 = { 'ok' : Order } |
  { 'err' : UpdateOrderError };
export type Result_20 = { 'ok' : Category } |
  { 'err' : CreateCategoryError };
export type Result_21 = { 'ok' : WishlistItem } |
  { 'err' : CreateWishlistItemError };
export type Result_22 = { 'ok' : CartItem } |
  { 'err' : CreateCartItemsError };
export type Result_3 = { 'ok' : Product } |
  { 'err' : UpdateProductError };
export type Result_4 = { 'ok' : Contact } |
  { 'err' : UpdateContactError };
export type Result_5 = { 'ok' : Category } |
  { 'err' : UpdateCategoryError };
export type Result_6 = { 'ok' : CartItem } |
  { 'err' : UpdateCartItemsError };
export type Result_7 = { 'ok' : User } |
  { 'err' : GetUserError };
export type Result_8 = { 'ok' : Product } |
  { 'err' : GetProductError };
export type Result_9 = { 'ok' : Order } |
  { 'err' : OrderError };
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
  'read' : boolean,
  'email' : string,
  'message' : string,
}
export interface UserProduct {
  'title' : string,
  'active' : boolean,
  'inventory' : bigint,
  'color' : color,
  'size' : size,
  'description' : string,
  'category' : SlugId,
  'price' : number,
}
export type WishlistId = string;
export interface WishlistItem {
  'id' : WishlistId,
  'time_created' : Time,
  'principal' : Principal,
  'product_slug' : string,
  'time_updated' : Time,
}
export type color = { 'Red' : null } |
  { 'Yellow' : null } |
  { 'Blue' : null } |
  { 'Cyan' : null } |
  { 'Green' : null } |
  { 'Gold' : null } |
  { 'Gray' : null } |
  { 'Lime' : null } |
  { 'Navy' : null } |
  { 'Pink' : null } |
  { 'Teal' : null } |
  { 'Black' : null } |
  { 'Brown' : null } |
  { 'White' : null } |
  { 'Orange' : null } |
  { 'Purple' : null } |
  { 'Olive' : null } |
  { 'Magenta' : null } |
  { 'Silver' : null } |
  { 'Maroon' : null };
export type size = { 'L' : null } |
  { 'M' : null } |
  { 'S' : null } |
  { 'XL' : null } |
  { 'XS' : null } |
  { 'XXL' : null };
export interface _SERVICE {
  'addtoCartItems' : ActorMethod<[string, number, size, color], Result_22>,
  'addtoWishlist' : ActorMethod<[string], Result_21>,
  'createCategory' : ActorMethod<[string, ImgId], Result_20>,
  'createContact' : ActorMethod<[UserContact], Result_19>,
  'createOrder' : ActorMethod<[NewOrder], Result_9>,
  'createProduct' : ActorMethod<
    [UserProduct, [] | [Uint8Array | number[]]],
    Result_18
  >,
  'deleteCartItems' : ActorMethod<[CartId], Result_17>,
  'deleteCategory' : ActorMethod<[SlugId], Result_16>,
  'deleteContact' : ActorMethod<[ContactId], Result_15>,
  'deleteOrder' : ActorMethod<[OrderId], Result_14>,
  'deleteProduct' : ActorMethod<[SlugId], Result_13>,
  'deleteWishlistItems' : ActorMethod<[WishlistId], Result_12>,
  'getCallerCartItems' : ActorMethod<[], Array<[CartId, CartItem]>>,
  'getCategory' : ActorMethod<[SlugId], Result_11>,
  'getContact' : ActorMethod<[ContactId], Result_10>,
  'getOrder' : ActorMethod<[string], Result_9>,
  'getProduct' : ActorMethod<[SlugId], Result_8>,
  'getUserdetailsbycaller' : ActorMethod<[], Result_7>,
  'getUserdetailsbyid' : ActorMethod<[Principal], Result_7>,
  'listCategories' : ActorMethod<[], Array<[SlugId, Category]>>,
  'listContacts' : ActorMethod<[], Array<[ContactId, Contact]>>,
  'listUserOrders' : ActorMethod<[], Array<[OrderId, Order]>>,
  'listUsers' : ActorMethod<[], Array<[Principal, User]>>,
  'listWishlistItems' : ActorMethod<[], Array<[WishlistId, WishlistItem]>>,
  'listallOrders' : ActorMethod<[], Array<[OrderId, Order]>>,
  'listallProducts' : ActorMethod<[], Array<[SlugId, Product]>>,
  'searchproductsbycategory' : ActorMethod<[SlugId], Array<[SlugId, Product]>>,
  'searchproductsbytitle' : ActorMethod<[string], Array<[SlugId, Product]>>,
  'updateCartItems' : ActorMethod<[CartId, number, size, color], Result_6>,
  'updateCategory' : ActorMethod<[SlugId, string, ImgId], Result_5>,
  'updateContact' : ActorMethod<[ContactId, boolean], Result_4>,
  'updateOrderStatus' : ActorMethod<[OrderId, string], Result_2>,
  'updateProduct' : ActorMethod<
    [SlugId, UserProduct, [] | [Uint8Array | number[]]],
    Result_3
  >,
  'updateTrackingUrl' : ActorMethod<[OrderId, string], Result_2>,
  'updateUser' : ActorMethod<[string, string, string], Result_1>,
  'updateWishlistItems' : ActorMethod<[WishlistId], Result>,
}
