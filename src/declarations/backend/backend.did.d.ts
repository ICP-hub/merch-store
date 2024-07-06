import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

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
export interface Asset { 'class' : AssetClass, 'symbol' : string }
export type AssetClass = { 'Cryptocurrency' : null } |
  { 'FiatCurrency' : null };
export type CartId = string;
export interface CartItem {
  'time_created' : Time,
  'color' : string,
  'size' : string,
  'product_slug' : string,
  'time_updated' : Time,
  'quantity' : number,
}
export interface Category {
  'featured' : boolean,
  'active' : boolean,
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
  { 'CartItemAlreadyExists' : null } |
  { 'EmptyProductSlug' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'ProductSlugAlreadyExists' : null } |
  { 'EmptySize' : null } |
  { 'EmptyColor' : null };
export type CreateCategoryError = { 'UserNotAdmin' : null } |
  { 'CategoryAlreadyExists' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyName' : null };
export type CreateContactError = { 'ContactAlreadyExists' : null } |
  { 'EmptyName' : null } |
  { 'EmptyMessage' : null } |
  { 'EmptyEmail' : null };
export type CreateProductError = { 'UserNotAdmin' : null } |
  { 'CategoryNotFound' : null } |
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
  { 'CartItemNotFound' : null } |
  { 'CartisEmpty' : null } |
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
  { 'listisempty' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'WishlistItemNotFound' : null };
export interface ExchangeRate {
  'metadata' : ExchangeRateMetadata,
  'rate' : bigint,
  'timestamp' : bigint,
  'quote_asset' : Asset,
  'base_asset' : Asset,
}
export type ExchangeRateError = { 'AnonymousPrincipalNotAllowed' : null } |
  { 'CryptoQuoteAssetNotFound' : null } |
  { 'FailedToAcceptCycles' : null } |
  { 'ForexBaseAssetNotFound' : null } |
  { 'CryptoBaseAssetNotFound' : null } |
  { 'StablecoinRateTooFewRates' : null } |
  { 'ForexAssetsNotFound' : null } |
  { 'InconsistentRatesReceived' : null } |
  { 'RateLimited' : null } |
  { 'StablecoinRateZeroRate' : null } |
  { 'Other' : { 'code' : number, 'description' : string } } |
  { 'ForexInvalidTimestamp' : null } |
  { 'NotEnoughCycles' : null } |
  { 'ForexQuoteAssetNotFound' : null } |
  { 'StablecoinRateNotFound' : null } |
  { 'Pending' : null };
export interface ExchangeRateMetadata {
  'decimals' : number,
  'forex_timestamp' : [] | [bigint],
  'quote_asset_num_received_rates' : bigint,
  'base_asset_num_received_rates' : bigint,
  'base_asset_num_queried_sources' : bigint,
  'standard_deviation' : bigint,
  'quote_asset_num_queried_sources' : bigint,
}
export type GetAddressError = { 'AddressNotFound' : null };
export type GetCategoryError = { 'CategoryNotFound' : null };
export type GetContactError = { 'UserNotAdmin' : null } |
  { 'ContactNotFound' : null } |
  { 'UserNotAuthenticated' : null };
export type GetExchangeRateResult = { 'Ok' : ExchangeRate } |
  { 'Err' : ExchangeRateError };
export type GetPaymentStatusError = { 'OrderNotFound' : null };
export type GetProductError = { 'ProductNotFound' : null };
export type GetStatisticalDetailError = { 'UserNotAdmin' : null };
export type GetUserError = { 'UserNotFound' : null };
export type GetVariantError = { 'VariantNotFound' : null };
export type Index = bigint;
export interface NewOrder {
  'awb' : string,
  'paymentStatus' : string,
  'paymentMethod' : string,
  'shippingAmount' : ShippingAmount,
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
  'shippingAmount' : ShippingAmount,
  'orderStatus' : string,
  'userid' : Principal,
  'paymentAddress' : string,
  'timeCreated' : Time,
  'totalAmount' : number,
  'shippingAddress' : Address,
  'products' : Array<OrderProduct>,
  'subTotalAmount' : number,
}
export type OrderError = { 'PaymentFailed' : null } |
  { 'PaymentAddressAlreadyUsed' : null } |
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
export type Result_1 = { 'ok' : ShippingAmount } |
  { 'err' : UpdateShippingAmountError };
export type Result_10 = { 'ok' : [Order, Result__1] } |
  { 'err' : OrderError };
export type Result_11 = { 'ok' : Variants } |
  { 'err' : GetVariantError };
export type Result_12 = { 'ok' : StatisticalDetail } |
  { 'err' : GetStatisticalDetailError };
export type Result_13 = { 'ok' : string } |
  { 'err' : GetPaymentStatusError };
export type Result_14 = { 'ok' : User } |
  { 'err' : GetUserError };
export type Result_15 = { 'ok' : Product } |
  { 'err' : GetProductError };
export type Result_16 = { 'ok' : Order } |
  { 'err' : OrderError };
export type Result_17 = { 'ok' : Contact } |
  { 'err' : GetContactError };
export type Result_18 = { 'ok' : Category } |
  { 'err' : GetCategoryError };
export type Result_19 = { 'ok' : Address } |
  { 'err' : GetAddressError };
export type Result_2 = { 'ok' : [User, Index] } |
  { 'err' : UpdateUserError };
export type Result_20 = { 'ok' : null } |
  { 'err' : DeleteVariantError };
export type Result_21 = { 'ok' : null } |
  { 'err' : DeleteAddressError };
export type Result_22 = { 'ok' : null } |
  { 'err' : DeleteWishlistItemError };
export type Result_23 = { 'ok' : null } |
  { 'err' : DeleteProductError };
export type Result_24 = { 'ok' : null } |
  { 'err' : DeleteOrderError };
export type Result_25 = { 'ok' : null } |
  { 'err' : DeleteContactError };
export type Result_26 = { 'ok' : null } |
  { 'err' : DeleteCategoryError };
export type Result_27 = { 'ok' : null } |
  { 'err' : DeleteCartItemsError };
export type Result_28 = { 'ok' : Variants } |
  { 'err' : CreateVariantError };
export type Result_29 = { 'ok' : Product } |
  { 'err' : CreateProductError };
export type Result_3 = { 'ok' : Order } |
  { 'err' : UpdateOrderError };
export type Result_30 = { 'ok' : Contact } |
  { 'err' : CreateContactError };
export type Result_31 = { 'ok' : [Category, Index] } |
  { 'err' : CreateCategoryError };
export type Result_32 = { 'ok' : [Address, Index] } |
  { 'err' : CreateAddressError };
export type Result_33 = { 'ok' : [WishlistItem, Index] } |
  { 'err' : CreateWishlistItemError };
export type Result_34 = { 'ok' : [CartItem, Index] } |
  { 'err' : CreateCartItemsError };
export type Result_4 = { 'ok' : [Product, Index] } |
  { 'err' : UpdateProductError };
export type Result_5 = { 'ok' : Order } |
  { 'err' : UpdatepaymentStatusError };
export type Result_6 = { 'ok' : Contact } |
  { 'err' : UpdateContactError };
export type Result_7 = { 'ok' : [Category, Index] } |
  { 'err' : UpdateCategoryError };
export type Result_8 = { 'ok' : CartItem } |
  { 'err' : UpdateCartItemsError };
export type Result_9 = { 'ok' : Address } |
  { 'err' : UpdateAddressError };
export type Result__1 = { 'Ok' : bigint } |
  { 'Err' : TransferError };
export interface ShippingAmount { 'shipping_amount' : number }
export type SlugId = string;
export interface StatisticalDetail {
  'totalProducts' : bigint,
  'totalOrders' : bigint,
  'totalContacts' : bigint,
  'totalUsers' : bigint,
  'totalCategories' : bigint,
}
export type Time = bigint;
export type TransferError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'BadBurn' : { 'min_burn_amount' : bigint } } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'BadFee' : { 'expected_fee' : bigint } } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : { 'balance' : bigint } };
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
  { 'CartisEmpty' : null } |
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
export type UpdateShippingAmountError = { 'UserNotAdmin' : null } |
  { 'EmptyShippingAmount' : null };
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
export interface WishlistItem {
  'time_created' : Time,
  'product_slug' : string,
  'time_updated' : Time,
}
export interface _SERVICE {
  'addtoCartItems' : ActorMethod<[string, string, string, number], Result_34>,
  'addtoWishlist' : ActorMethod<[string], Result_33>,
  'clearallcartitmesbyprincipal' : ActorMethod<[], Result_27>,
  'createAddress' : ActorMethod<[UserAddress], Result_32>,
  'createCategory' : ActorMethod<[string, string, boolean, boolean], Result_31>,
  'createContact' : ActorMethod<[UserContact], Result_30>,
  'createProduct' : ActorMethod<
    [UserProduct, Array<VariantSize>, Array<VariantColor>],
    Result_29
  >,
  'createVariant' : ActorMethod<
    [SlugId, string, string, bigint, number, number],
    Result_28
  >,
  'deleteCartItems' : ActorMethod<[string], Result_27>,
  'deleteCategory' : ActorMethod<[SlugId], Result_26>,
  'deleteContact' : ActorMethod<[ContactId], Result_25>,
  'deleteOrder' : ActorMethod<[OrderId], Result_24>,
  'deleteProduct' : ActorMethod<[SlugId], Result_23>,
  'deleteWishlistItems' : ActorMethod<[string], Result_22>,
  'deleteaddress' : ActorMethod<[string], Result_21>,
  'deletevariant' : ActorMethod<[SlugId], Result_20>,
  'getAddress' : ActorMethod<[string], Result_19>,
  'getCallerCartItems' : ActorMethod<
    [bigint, bigint],
    {
      'data' : Array<CartItem>,
      'total_pages' : bigint,
      'current_page' : bigint,
    }
  >,
  'getCategory' : ActorMethod<[SlugId], Result_18>,
  'getContact' : ActorMethod<[ContactId], Result_17>,
  'getOrder' : ActorMethod<[string], Result_16>,
  'getProduct' : ActorMethod<[SlugId], Result_15>,
  'getUserdetailsbycaller' : ActorMethod<[], Result_14>,
  'getUserdetailsbyid' : ActorMethod<[Principal], Result_14>,
  'get_exchange_rates' : ActorMethod<[Asset, Asset], GetExchangeRateResult>,
  'getpaymentstatus' : ActorMethod<[string], Result_13>,
  'getshippingamount' : ActorMethod<[], ShippingAmount>,
  'getstatisticaldetailforadmin' : ActorMethod<[], Result_12>,
  'getvariant' : ActorMethod<[SlugId], Result_11>,
  'isAdmin' : ActorMethod<[Principal], boolean>,
  'listContacts' : ActorMethod<
    [bigint, bigint],
    { 'data' : Array<Contact>, 'total_pages' : bigint, 'current_page' : bigint }
  >,
  'listUserAddresses' : ActorMethod<[], Array<Address>>,
  'listUsers' : ActorMethod<
    [bigint, bigint],
    { 'data' : Array<User>, 'total_pages' : bigint, 'current_page' : bigint }
  >,
  'listWishlistItems' : ActorMethod<
    [bigint, bigint],
    {
      'data' : Array<WishlistItem>,
      'total_pages' : bigint,
      'current_page' : bigint,
    }
  >,
  'listallOrders' : ActorMethod<
    [bigint, bigint],
    { 'data' : Array<Order>, 'total_pages' : bigint, 'current_page' : bigint }
  >,
  'listallProducts' : ActorMethod<
    [bigint, bigint],
    { 'data' : Array<Product>, 'total_pages' : bigint, 'current_page' : bigint }
  >,
  'place_order' : ActorMethod<
    [
      NewOrder,
      Principal,
      Principal,
      bigint,
      { 'icp' : null } |
        { 'ckbtc' : null },
    ],
    Result_10
  >,
  'updateAddress' : ActorMethod<[Address, string, Principal], Result_9>,
  'updateCartItems' : ActorMethod<[CartId, number, string, string], Result_8>,
  'updateCategory' : ActorMethod<
    [SlugId, string, string, boolean, boolean],
    Result_7
  >,
  'updateContact' : ActorMethod<[ContactId, boolean], Result_6>,
  'updateOrderStatus' : ActorMethod<[OrderId, string], Result_3>,
  'updatePaymentstatus' : ActorMethod<[OrderId, string], Result_5>,
  'updateProduct' : ActorMethod<
    [SlugId, UserProduct, Array<VariantSize>, Array<VariantColor>],
    Result_4
  >,
  'updateTrackingUrl' : ActorMethod<[OrderId, string], Result_3>,
  'updateUser' : ActorMethod<[string, string, string], Result_2>,
  'updateshippingamount' : ActorMethod<[ShippingAmount], Result_1>,
  'updatevariant' : ActorMethod<
    [SlugId, string, string, bigint, number, number],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
