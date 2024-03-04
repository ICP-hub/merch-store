export const idlFactory = ({ IDL }) => {
  const CartId = IDL.Text;
  const Time = IDL.Int;
  const CartItem = IDL.Record({
    'id' : CartId,
    'time_created' : Time,
    'principal' : IDL.Principal,
    'color' : IDL.Text,
    'size' : IDL.Text,
    'product_slug' : IDL.Text,
    'time_updated' : Time,
    'quantity' : IDL.Nat8,
  });
  const CreateCartItemsError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'EmptyProductSlug' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'ProductSlugAlreadyExists' : IDL.Null,
    'EmptySize' : IDL.Null,
    'EmptyColor' : IDL.Null,
  });
  const Result_32 = IDL.Variant({
    'ok' : CartItem,
    'err' : CreateCartItemsError,
  });
  const WishlistId = IDL.Text;
  const WishlistItem = IDL.Record({
    'id' : WishlistId,
    'time_created' : Time,
    'principal' : IDL.Principal,
    'product_slug' : IDL.Text,
    'time_updated' : Time,
  });
  const CreateWishlistItemError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'EmptyProductSlug' : IDL.Null,
    'WishlistItemAlreadyExists' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_31 = IDL.Variant({
    'ok' : WishlistItem,
    'err' : CreateWishlistItemError,
  });
  const DeleteCartItemsError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_25 = IDL.Variant({
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
  const Result_30 = IDL.Variant({ 'ok' : Address, 'err' : CreateAddressError });
  const SlugId = IDL.Text;
  const Category = IDL.Record({
    'featured' : IDL.Bool,
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
  const Result_29 = IDL.Variant({
    'ok' : Category,
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
    'EmptyName' : IDL.Null,
    'EmptyMessage' : IDL.Null,
    'EmptyEmail' : IDL.Null,
  });
  const Result_28 = IDL.Variant({ 'ok' : Contact, 'err' : CreateContactError });
  const shippingAmount = IDL.Record({ 'shipping_amount' : IDL.Float64 });
  const OrderProduct = IDL.Record({
    'id' : IDL.Text,
    'img' : IDL.Text,
    'title' : IDL.Text,
    'color' : IDL.Text,
    'size' : IDL.Text,
    'sale_price' : IDL.Float64,
    'quantity' : IDL.Nat8,
  });
  const NewOrder = IDL.Record({
    'awb' : IDL.Text,
    'paymentStatus' : IDL.Text,
    'paymentMethod' : IDL.Text,
    'shippingAmount' : shippingAmount,
    'orderStatus' : IDL.Text,
    'userid' : IDL.Principal,
    'paymentAddress' : IDL.Text,
    'totalAmount' : IDL.Float64,
    'shippingAddress' : Address,
    'products' : IDL.Vec(OrderProduct),
    'subTotalAmount' : IDL.Float64,
  });
  const OrderId = IDL.Text;
  const Order = IDL.Record({
    'id' : OrderId,
    'awb' : IDL.Text,
    'timeUpdated' : Time,
    'paymentStatus' : IDL.Text,
    'paymentMethod' : IDL.Text,
    'shippingAmount' : shippingAmount,
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
    'PaymentAddressAlreadyUsed' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'MissingData' : IDL.Null,
    'UnableToCreate' : IDL.Null,
    'UnableToUpdate' : IDL.Null,
  });
  const Result_14 = IDL.Variant({ 'ok' : Order, 'err' : OrderError });
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
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_27 = IDL.Variant({ 'ok' : Product, 'err' : CreateProductError });
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
  const Result_26 = IDL.Variant({
    'ok' : Variants,
    'err' : CreateVariantError,
  });
  const DeleteCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_24 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteCategoryError,
  });
  const DeleteContactError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_23 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteContactError,
  });
  const DeleteOrderError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_22 = IDL.Variant({ 'ok' : IDL.Null, 'err' : DeleteOrderError });
  const DeleteProductError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_21 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteProductError,
  });
  const DeleteWishlistItemError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_20 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteWishlistItemError,
  });
  const DeleteAddressError = IDL.Variant({
    'UserNotAuthenticated' : IDL.Null,
    'AddressNotFound' : IDL.Null,
  });
  const Result_19 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteAddressError,
  });
  const DeleteVariantError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'VariantNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_18 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteVariantError,
  });
  const GetAddressError = IDL.Variant({ 'AddressNotFound' : IDL.Null });
  const Result_17 = IDL.Variant({ 'ok' : Address, 'err' : GetAddressError });
  const GetCategoryError = IDL.Variant({ 'CategoryNotFound' : IDL.Null });
  const Result_16 = IDL.Variant({ 'ok' : Category, 'err' : GetCategoryError });
  const GetContactError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'ContactNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_15 = IDL.Variant({ 'ok' : Contact, 'err' : GetContactError });
  const GetProductError = IDL.Variant({ 'ProductNotFound' : IDL.Null });
  const Result_13 = IDL.Variant({ 'ok' : Product, 'err' : GetProductError });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'email' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const GetUserError = IDL.Variant({ 'UserNotFound' : IDL.Null });
  const Result_12 = IDL.Variant({ 'ok' : User, 'err' : GetUserError });
  const GetPaymentStatusError = IDL.Variant({ 'OrderNotFound' : IDL.Null });
  const Result_11 = IDL.Variant({
    'ok' : IDL.Text,
    'err' : GetPaymentStatusError,
  });
  const GetVariantError = IDL.Variant({ 'VariantNotFound' : IDL.Null });
  const Result_10 = IDL.Variant({ 'ok' : Variants, 'err' : GetVariantError });
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
  const Result_9 = IDL.Variant({ 'ok' : Address, 'err' : UpdateAddressError });
  const UpdateCartItemsError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CartItemNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_8 = IDL.Variant({
    'ok' : CartItem,
    'err' : UpdateCartItemsError,
  });
  const UpdateCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CategoryNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyName' : IDL.Null,
  });
  const Result_7 = IDL.Variant({
    'ok' : Category,
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
  const Result_4 = IDL.Variant({ 'ok' : Product, 'err' : UpdateProductError });
  const UpdateUserError = IDL.Variant({
    'UserNotAuthenticated' : IDL.Null,
    'EmptyLastName' : IDL.Null,
    'EmptyFirstName' : IDL.Null,
    'EmptyEmail' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const Result_2 = IDL.Variant({ 'ok' : User, 'err' : UpdateUserError });
  const UpdateWishlistItemError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'WishlistItemNotFound' : IDL.Null,
  });
  const Result_1 = IDL.Variant({
    'ok' : WishlistItem,
    'err' : UpdateWishlistItemError,
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
        [Result_32],
        [],
      ),
    'addtoWishlist' : IDL.Func([IDL.Text], [Result_31], []),
    'clearallcartitmesbyprincipal' : IDL.Func([], [Result_25], []),
    'createAddress' : IDL.Func([UserAddress], [Result_30], []),
    'createCategory' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Bool],
        [Result_29],
        [],
      ),
    'createContact' : IDL.Func([UserContact], [Result_28], []),
    'createOrder' : IDL.Func([NewOrder], [Result_14], []),
    'createProduct' : IDL.Func(
        [UserProduct, IDL.Vec(VariantSize), IDL.Vec(VariantColor)],
        [Result_27],
        [],
      ),
    'createVariant' : IDL.Func(
        [SlugId, IDL.Text, IDL.Text, IDL.Nat, IDL.Float64, IDL.Float64],
        [Result_26],
        [],
      ),
    'deleteCartItems' : IDL.Func([CartId], [Result_25], []),
    'deleteCategory' : IDL.Func([SlugId], [Result_24], []),
    'deleteContact' : IDL.Func([ContactId], [Result_23], []),
    'deleteOrder' : IDL.Func([OrderId], [Result_22], []),
    'deleteProduct' : IDL.Func([SlugId], [Result_21], []),
    'deleteWishlistItems' : IDL.Func([WishlistId], [Result_20], []),
    'deleteaddress' : IDL.Func([IDL.Text], [Result_19], []),
    'deletevariant' : IDL.Func([SlugId], [Result_18], []),
    'getAddress' : IDL.Func([IDL.Text], [Result_17], []),
    'getCallerCartItems' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(CartId, CartItem))],
        ['query'],
      ),
    'getCategory' : IDL.Func([SlugId], [Result_16], ['query']),
    'getContact' : IDL.Func([ContactId], [Result_15], ['query']),
    'getOrder' : IDL.Func([IDL.Text], [Result_14], ['query']),
    'getProduct' : IDL.Func([SlugId], [Result_13], ['query']),
    'getUserdetailsbycaller' : IDL.Func([], [Result_12], ['query']),
    'getUserdetailsbyid' : IDL.Func([IDL.Principal], [Result_12], ['query']),
    'getpaymentstatus' : IDL.Func([], [Result_11], []),
    'getvariant' : IDL.Func([SlugId], [Result_10], []),
    'isAdmin' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'listCategories' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(SlugId, Category))],
        ['query'],
      ),
    'listContacts' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(ContactId, Contact))],
        ['query'],
      ),
    'listUserAddresses' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(Address)))],
        ['query'],
      ),
    'listUserOrders' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(OrderId, Order))],
        ['query'],
      ),
    'listUsers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, User))],
        ['query'],
      ),
    'listWishlistItems' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(WishlistId, WishlistItem))],
        ['query'],
      ),
    'listallOrders' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(OrderId, Order))],
        ['query'],
      ),
    'listallProducts' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(SlugId, Product))],
        ['query'],
      ),
    'searchproductsbycategory' : IDL.Func(
        [SlugId],
        [IDL.Vec(IDL.Tuple(SlugId, Product))],
        ['query'],
      ),
    'searchproductsbytitle' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(SlugId, Product))],
        ['query'],
      ),
    'updateAddress' : IDL.Func(
        [Address, IDL.Text, IDL.Principal],
        [Result_9],
        [],
      ),
    'updateCartItems' : IDL.Func(
        [CartId, IDL.Nat8, IDL.Text, IDL.Text],
        [Result_8],
        [],
      ),
    'updateCategory' : IDL.Func(
        [SlugId, IDL.Text, IDL.Text, IDL.Bool],
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
    'updateWishlistItems' : IDL.Func([WishlistId], [Result_1], []),
    'updatevariant' : IDL.Func(
        [SlugId, IDL.Text, IDL.Text, IDL.Nat, IDL.Float64, IDL.Float64],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
