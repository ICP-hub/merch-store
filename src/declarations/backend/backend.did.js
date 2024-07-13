export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const List_1 = IDL.Rec();
  const Time = IDL.Int;
  const CartItem = IDL.Record({
    'time_created' : Time,
    'color' : IDL.Text,
    'size' : IDL.Text,
    'product_slug' : IDL.Text,
    'time_updated' : Time,
    'quantity' : IDL.Nat8,
  });
  List_1.fill(IDL.Opt(IDL.Tuple(CartItem, List_1)));
  const cartItemobject = IDL.Record({
    'cartItemlist' : List_1,
    'userprincipal' : IDL.Principal,
  });
  const Index = IDL.Nat64;
  const CreateCartItemsError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CartItemAlreadyExists' : IDL.Null,
    'EmptyProductSlug' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'ProductSlugAlreadyExists' : IDL.Null,
    'EmptySize' : IDL.Null,
    'EmptyColor' : IDL.Null,
  });
  const Result_33 = IDL.Variant({
    'ok' : IDL.Tuple(cartItemobject, Index),
    'err' : CreateCartItemsError,
  });
  const WishlistItem = IDL.Record({
    'time_created' : Time,
    'color' : IDL.Text,
    'size' : IDL.Text,
    'product_slug' : IDL.Text,
    'time_updated' : Time,
  });
  List.fill(IDL.Opt(IDL.Tuple(WishlistItem, List)));
  const wishlistItemobject = IDL.Record({
    'wishlistItem' : List,
    'userprincipal' : IDL.Principal,
  });
  const CreateWishlistItemError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'EmptyProductSlug' : IDL.Null,
    'WishlistItemAlreadyExists' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_32 = IDL.Variant({
    'ok' : IDL.Tuple(wishlistItemobject, Index),
    'err' : CreateWishlistItemError,
  });
  const DeleteCartItemsError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CartItemNotFound' : IDL.Null,
    'CartisEmpty' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_26 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteCartItemsError,
  });
  const UserAddress = IDL.Record({
    'firstname' : IDL.Text,
    'country' : IDL.Text,
    'city' : IDL.Text,
    'email' : IDL.Text,
    'state' : IDL.Text,
    'address_type' : IDL.Text,
    'phone_number' : IDL.Text,
    'pincode' : IDL.Text,
    'lastname' : IDL.Text,
    'addressline1' : IDL.Text,
    'addressline2' : IDL.Text,
  });
  const Address = IDL.Record({
    'id' : IDL.Text,
    'firstname' : IDL.Text,
    'country' : IDL.Text,
    'city' : IDL.Text,
    'email' : IDL.Text,
    'state' : IDL.Text,
    'address_type' : IDL.Text,
    'phone_number' : IDL.Text,
    'pincode' : IDL.Text,
    'lastname' : IDL.Text,
    'addressline1' : IDL.Text,
    'addressline2' : IDL.Text,
  });
  const CreateAddressError = IDL.Variant({
    'EmptyCountry' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyCity' : IDL.Null,
    'EmptyPhoneNumber' : IDL.Null,
    'EmptyLastName' : IDL.Null,
    'EmptyAddressLine1' : IDL.Null,
    'EmptyFirstName' : IDL.Null,
    'EmptyEmail' : IDL.Null,
    'EmptyPincode' : IDL.Null,
    'EmptyState' : IDL.Null,
  });
  const Result_31 = IDL.Variant({
    'ok' : IDL.Tuple(Address, Index),
    'err' : CreateAddressError,
  });
  const SlugId = IDL.Text;
  const Category = IDL.Record({
    'featured' : IDL.Bool,
    'active' : IDL.Bool,
    'category_img' : IDL.Text,
    'name' : IDL.Text,
    'slug' : SlugId,
  });
  const CreateCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CategoryAlreadyExists' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyName' : IDL.Null,
  });
  const Result_30 = IDL.Variant({
    'ok' : IDL.Tuple(Category, Index),
    'err' : CreateCategoryError,
  });
  const UserContact = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'contact_number' : IDL.Text,
    'message' : IDL.Text,
  });
  const ContactId = IDL.Text;
  const Contact = IDL.Record({
    'id' : ContactId,
    'time_created' : Time,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'time_updated' : Time,
    'contact_number' : IDL.Text,
    'message' : IDL.Text,
  });
  const CreateContactError = IDL.Variant({
    'ContactAlreadyExists' : IDL.Null,
    'EmptyName' : IDL.Null,
    'EmptyMessage' : IDL.Null,
    'EmptyEmail' : IDL.Null,
  });
  const Result_29 = IDL.Variant({ 'ok' : Contact, 'err' : CreateContactError });
  const UserProduct = IDL.Record({
    'title' : IDL.Text,
    'active' : IDL.Bool,
    'description' : IDL.Text,
    'trending' : IDL.Bool,
    'newArrival' : IDL.Bool,
    'category' : SlugId,
  });
  const VariantSize = IDL.Record({ 'size' : IDL.Text });
  const VariantColor = IDL.Record({
    'img1' : IDL.Text,
    'img2' : IDL.Text,
    'img3' : IDL.Text,
    'inventory' : IDL.Nat,
    'color' : IDL.Text,
    'variant_price' : IDL.Float64,
    'variant_sale_price' : IDL.Float64,
  });
  const ProductId = IDL.Nat;
  const Product = IDL.Record({
    'id' : ProductId,
    'time_created' : Time,
    'title' : IDL.Text,
    'variantColor' : IDL.Vec(VariantColor),
    'active' : IDL.Bool,
    'slug' : SlugId,
    'description' : IDL.Text,
    'variantSize' : IDL.Vec(VariantSize),
    'trending' : IDL.Bool,
    'newArrival' : IDL.Bool,
    'time_updated' : Time,
    'category' : SlugId,
  });
  const CreateProductError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CategoryNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_28 = IDL.Variant({ 'ok' : Product, 'err' : CreateProductError });
  const Variants = IDL.Record({
    'variant_slug' : SlugId,
    'inventory' : IDL.Nat,
    'color' : IDL.Text,
    'size' : IDL.Text,
    'variant_price' : IDL.Float64,
    'product_slug' : SlugId,
    'variant_sale_price' : IDL.Float64,
  });
  const CreateVariantError = IDL.Variant({
    'VariantSlugAlreadyExists' : IDL.Null,
    'UserNotAdmin' : IDL.Null,
    'ProductSlugNotFound' : IDL.Null,
    'EmptyProductSlug' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptySize' : IDL.Null,
    'EmptyColor' : IDL.Null,
  });
  const Result_27 = IDL.Variant({
    'ok' : Variants,
    'err' : CreateVariantError,
  });
  const DeleteCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_25 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteCategoryError,
  });
  const DeleteContactError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_24 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteContactError,
  });
  const OrderId = IDL.Text;
  const DeleteOrderError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_23 = IDL.Variant({ 'ok' : IDL.Null, 'err' : DeleteOrderError });
  const DeleteProductError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_22 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteProductError,
  });
  const DeleteWishlistItemError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'listisempty' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'WishlistItemNotFound' : IDL.Null,
  });
  const Result_21 = IDL.Variant({
    'ok' : wishlistItemobject,
    'err' : DeleteWishlistItemError,
  });
  const DeleteAddressError = IDL.Variant({
    'UserNotAuthenticated' : IDL.Null,
    'AddressNotFound' : IDL.Null,
  });
  const Result_20 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteAddressError,
  });
  const DeleteVariantError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'VariantNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_19 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteVariantError,
  });
  const GetAddressError = IDL.Variant({ 'AddressNotFound' : IDL.Null });
  const Result_18 = IDL.Variant({ 'ok' : Address, 'err' : GetAddressError });
  const GetCategoryError = IDL.Variant({ 'CategoryNotFound' : IDL.Null });
  const Result_17 = IDL.Variant({ 'ok' : Category, 'err' : GetCategoryError });
  const GetContactError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'ContactNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_16 = IDL.Variant({ 'ok' : Contact, 'err' : GetContactError });
  const ShippingAmount = IDL.Record({ 'shipping_amount' : IDL.Float64 });
  const OrderProduct = IDL.Record({
    'id' : IDL.Text,
    'img' : IDL.Text,
    'title' : IDL.Text,
    'color' : IDL.Text,
    'size' : IDL.Text,
    'sale_price' : IDL.Float64,
    'quantity' : IDL.Nat8,
  });
  const Order = IDL.Record({
    'id' : OrderId,
    'awb' : IDL.Text,
    'timeUpdated' : Time,
    'paymentStatus' : IDL.Text,
    'paymentMethod' : IDL.Text,
    'shippingAmount' : ShippingAmount,
    'orderStatus' : IDL.Text,
    'userid' : IDL.Principal,
    'paymentAddress' : IDL.Text,
    'timeCreated' : Time,
    'totalAmount' : IDL.Float64,
    'shippingAddress' : Address,
    'products' : IDL.Vec(OrderProduct),
    'subTotalAmount' : IDL.Float64,
  });
  const OrderError = IDL.Variant({
    'PaymentFailed' : IDL.Null,
    'PaymentAddressAlreadyUsed' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'MissingData' : IDL.Null,
    'UnableToCreate' : IDL.Null,
    'UnableToUpdate' : IDL.Null,
  });
  const Result_15 = IDL.Variant({ 'ok' : Order, 'err' : OrderError });
  const GetProductError = IDL.Variant({ 'ProductNotFound' : IDL.Null });
  const Result_14 = IDL.Variant({ 'ok' : Product, 'err' : GetProductError });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'email' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const GetUserError = IDL.Variant({ 'UserNotFound' : IDL.Null });
  const Result_13 = IDL.Variant({ 'ok' : User, 'err' : GetUserError });
  const AssetClass = IDL.Variant({
    'Cryptocurrency' : IDL.Null,
    'FiatCurrency' : IDL.Null,
  });
  const Asset = IDL.Record({ 'class' : AssetClass, 'symbol' : IDL.Text });
  const ExchangeRateMetadata = IDL.Record({
    'decimals' : IDL.Nat32,
    'forex_timestamp' : IDL.Opt(IDL.Nat64),
    'quote_asset_num_received_rates' : IDL.Nat64,
    'base_asset_num_received_rates' : IDL.Nat64,
    'base_asset_num_queried_sources' : IDL.Nat64,
    'standard_deviation' : IDL.Nat64,
    'quote_asset_num_queried_sources' : IDL.Nat64,
  });
  const ExchangeRate = IDL.Record({
    'metadata' : ExchangeRateMetadata,
    'rate' : IDL.Nat64,
    'timestamp' : IDL.Nat64,
    'quote_asset' : Asset,
    'base_asset' : Asset,
  });
  const ExchangeRateError = IDL.Variant({
    'AnonymousPrincipalNotAllowed' : IDL.Null,
    'CryptoQuoteAssetNotFound' : IDL.Null,
    'FailedToAcceptCycles' : IDL.Null,
    'ForexBaseAssetNotFound' : IDL.Null,
    'CryptoBaseAssetNotFound' : IDL.Null,
    'StablecoinRateTooFewRates' : IDL.Null,
    'ForexAssetsNotFound' : IDL.Null,
    'InconsistentRatesReceived' : IDL.Null,
    'RateLimited' : IDL.Null,
    'StablecoinRateZeroRate' : IDL.Null,
    'Other' : IDL.Record({ 'code' : IDL.Nat32, 'description' : IDL.Text }),
    'ForexInvalidTimestamp' : IDL.Null,
    'NotEnoughCycles' : IDL.Null,
    'ForexQuoteAssetNotFound' : IDL.Null,
    'StablecoinRateNotFound' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const GetExchangeRateResult = IDL.Variant({
    'Ok' : ExchangeRate,
    'Err' : ExchangeRateError,
  });
  const GetPaymentStatusError = IDL.Variant({ 'OrderNotFound' : IDL.Null });
  const Result_12 = IDL.Variant({
    'ok' : IDL.Text,
    'err' : GetPaymentStatusError,
  });
  const StatisticalDetail = IDL.Record({
    'totalProducts' : IDL.Nat,
    'totalOrders' : IDL.Nat,
    'totalContacts' : IDL.Nat,
    'totalUsers' : IDL.Nat,
    'totalCategories' : IDL.Nat,
  });
  const GetStatisticalDetailError = IDL.Variant({ 'UserNotAdmin' : IDL.Null });
  const Result_11 = IDL.Variant({
    'ok' : StatisticalDetail,
    'err' : GetStatisticalDetailError,
  });
  const GetVariantError = IDL.Variant({ 'VariantNotFound' : IDL.Null });
  const Result_10 = IDL.Variant({ 'ok' : Variants, 'err' : GetVariantError });
  const NewOrder = IDL.Record({
    'awb' : IDL.Text,
    'paymentStatus' : IDL.Text,
    'paymentMethod' : IDL.Text,
    'shippingAmount' : ShippingAmount,
    'orderStatus' : IDL.Text,
    'userid' : IDL.Principal,
    'paymentAddress' : IDL.Text,
    'totalAmount' : IDL.Float64,
    'shippingAddress' : Address,
    'products' : IDL.Vec(OrderProduct),
    'subTotalAmount' : IDL.Float64,
  });
  const TransferError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'TemporarilyUnavailable' : IDL.Null,
    'BadBurn' : IDL.Record({ 'min_burn_amount' : IDL.Nat }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const Result__1 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : TransferError });
  const Result_9 = IDL.Variant({
    'ok' : IDL.Tuple(Order, Result__1),
    'err' : OrderError,
  });
  const UpdateAddressError = IDL.Variant({
    'EmptyCountry' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyCity' : IDL.Null,
    'EmptyPhoneNumber' : IDL.Null,
    'EmptyLastName' : IDL.Null,
    'EmptyAddressLine1' : IDL.Null,
    'AddressNotFound' : IDL.Null,
    'EmptyFirstName' : IDL.Null,
    'EmptyEmail' : IDL.Null,
    'EmptyPincode' : IDL.Null,
    'EmptyState' : IDL.Null,
  });
  const Result_8 = IDL.Variant({ 'ok' : Address, 'err' : UpdateAddressError });
  const UpdateCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CategoryNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyName' : IDL.Null,
  });
  const Result_7 = IDL.Variant({
    'ok' : IDL.Tuple(Category, Index),
    'err' : UpdateCategoryError,
  });
  const UpdateContactError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'ContactNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyName' : IDL.Null,
    'EmptyMessage' : IDL.Null,
    'EmptyEmail' : IDL.Null,
  });
  const Result_6 = IDL.Variant({ 'ok' : Contact, 'err' : UpdateContactError });
  const UpdateOrderError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_3 = IDL.Variant({ 'ok' : Order, 'err' : UpdateOrderError });
  const UpdatepaymentStatusError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_5 = IDL.Variant({
    'ok' : Order,
    'err' : UpdatepaymentStatusError,
  });
  const UpdateProductError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'ProductNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_4 = IDL.Variant({
    'ok' : IDL.Tuple(Product, Index),
    'err' : UpdateProductError,
  });
  const UpdateUserError = IDL.Variant({
    'UserNotAuthenticated' : IDL.Null,
    'EmptyLastName' : IDL.Null,
    'EmptyFirstName' : IDL.Null,
    'EmptyEmail' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Tuple(User, Index),
    'err' : UpdateUserError,
  });
  const UpdateShippingAmountError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'EmptyShippingAmount' : IDL.Null,
  });
  const Result_1 = IDL.Variant({
    'ok' : ShippingAmount,
    'err' : UpdateShippingAmountError,
  });
  const UpdateVariantError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'ProductSlugNotFound' : IDL.Null,
    'EmptyProductSlug' : IDL.Null,
    'VariantNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptySize' : IDL.Null,
    'EmptyColor' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : Variants, 'err' : UpdateVariantError });
  return IDL.Service({
    'addtoCartItems' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat8],
        [Result_33],
        [],
      ),
    'addtoWishlist' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_32], []),
    'clearallcartitmesbyprincipal' : IDL.Func([], [Result_26], []),
    'createAddress' : IDL.Func([UserAddress], [Result_31], []),
    'createCategory' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Bool, IDL.Bool],
        [Result_30],
        [],
      ),
    'createContact' : IDL.Func([UserContact], [Result_29], []),
    'createProduct' : IDL.Func(
        [UserProduct, IDL.Vec(VariantSize), IDL.Vec(VariantColor)],
        [Result_28],
        [],
      ),
    'createVariant' : IDL.Func(
        [SlugId, IDL.Text, IDL.Text, IDL.Nat, IDL.Float64, IDL.Float64],
        [Result_27],
        [],
      ),
    'deleteCartItems' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [Result_26],
        [],
      ),
    'deleteCategory' : IDL.Func([SlugId], [Result_25], []),
    'deleteContact' : IDL.Func([ContactId], [Result_24], []),
    'deleteOrder' : IDL.Func([OrderId], [Result_23], []),
    'deleteProduct' : IDL.Func([SlugId], [Result_22], []),
    'deleteWishlistItems' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [Result_21],
        [],
      ),
    'deleteaddress' : IDL.Func([IDL.Text], [Result_20], []),
    'deletevariant' : IDL.Func([SlugId], [Result_19], []),
    'getAddress' : IDL.Func([IDL.Text], [Result_18], []),
    'getCallerCartItems' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'data' : IDL.Vec(CartItem),
            'total_pages' : IDL.Nat,
            'current_page' : IDL.Nat,
          }),
        ],
        [],
      ),
    'getCategory' : IDL.Func([SlugId], [Result_17], []),
    'getContact' : IDL.Func([ContactId], [Result_16], []),
    'getOrder' : IDL.Func([IDL.Text], [Result_15], []),
    'getProduct' : IDL.Func([SlugId], [Result_14], []),
    'getUserdetailsbycaller' : IDL.Func([], [Result_13], []),
    'getUserdetailsbyid' : IDL.Func([IDL.Principal], [Result_13], []),
    'get_exchange_rates' : IDL.Func(
        [Asset, Asset],
        [GetExchangeRateResult],
        [],
      ),
    'getpaymentstatus' : IDL.Func([IDL.Text], [Result_12], []),
    'getshippingamount' : IDL.Func([], [ShippingAmount], ['query']),
    'getstatisticaldetailforadmin' : IDL.Func([], [Result_11], []),
    'getvariant' : IDL.Func([SlugId], [Result_10], []),
    'isAdmin' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'listCategories' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'data' : IDL.Vec(Category),
            'total_pages' : IDL.Nat,
            'current_page' : IDL.Nat,
          }),
        ],
        [],
      ),
    'listContacts' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'data' : IDL.Vec(Contact),
            'total_pages' : IDL.Nat,
            'current_page' : IDL.Nat,
          }),
        ],
        [],
      ),
    'listUserAddresses' : IDL.Func([], [IDL.Vec(Address)], []),
    'listUsers' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'data' : IDL.Vec(User),
            'total_pages' : IDL.Nat,
            'current_page' : IDL.Nat,
          }),
        ],
        [],
      ),
    'listWishlistItems' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'data' : IDL.Vec(WishlistItem),
            'total_pages' : IDL.Nat,
            'current_page' : IDL.Nat,
          }),
        ],
        [],
      ),
    'listallOrders' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'data' : IDL.Vec(Order),
            'total_pages' : IDL.Nat,
            'current_page' : IDL.Nat,
          }),
        ],
        [],
      ),
    'listallProducts' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [
          IDL.Record({
            'data' : IDL.Vec(Product),
            'total_pages' : IDL.Nat,
            'current_page' : IDL.Nat,
          }),
        ],
        [],
      ),
    'place_order' : IDL.Func(
        [
          NewOrder,
          IDL.Principal,
          IDL.Principal,
          IDL.Nat,
          IDL.Variant({ 'icp' : IDL.Null, 'ckbtc' : IDL.Null }),
        ],
        [Result_9],
        [],
      ),
    'updateAddress' : IDL.Func(
        [Address, IDL.Text, IDL.Principal],
        [Result_8],
        [],
      ),
    'updateCategory' : IDL.Func(
        [SlugId, IDL.Text, IDL.Text, IDL.Bool, IDL.Bool],
        [Result_7],
        [],
      ),
    'updateContact' : IDL.Func([ContactId, IDL.Bool], [Result_6], []),
    'updateOrderStatus' : IDL.Func([OrderId, IDL.Text], [Result_3], []),
    'updatePaymentstatus' : IDL.Func([OrderId, IDL.Text], [Result_5], []),
    'updateProduct' : IDL.Func(
        [SlugId, UserProduct, IDL.Vec(VariantSize), IDL.Vec(VariantColor)],
        [Result_4],
        [],
      ),
    'updateTrackingUrl' : IDL.Func([OrderId, IDL.Text], [Result_3], []),
    'updateUser' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_2], []),
    'updateshippingamount' : IDL.Func([ShippingAmount], [Result_1], []),
    'updatevariant' : IDL.Func(
        [SlugId, IDL.Text, IDL.Text, IDL.Nat, IDL.Float64, IDL.Float64],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
