export const idlFactory = ({ IDL }) => {
  const size = IDL.Variant({
    'L' : IDL.Null,
    'M' : IDL.Null,
    'S' : IDL.Null,
    'XL' : IDL.Null,
    'XS' : IDL.Null,
    'XXL' : IDL.Null,
  });
  const color = IDL.Variant({
    'Red' : IDL.Null,
    'Yellow' : IDL.Null,
    'Blue' : IDL.Null,
    'Cyan' : IDL.Null,
    'Green' : IDL.Null,
    'Gold' : IDL.Null,
    'Gray' : IDL.Null,
    'Lime' : IDL.Null,
    'Navy' : IDL.Null,
    'Pink' : IDL.Null,
    'Teal' : IDL.Null,
    'Black' : IDL.Null,
    'Brown' : IDL.Null,
    'White' : IDL.Null,
    'Orange' : IDL.Null,
    'Purple' : IDL.Null,
    'Olive' : IDL.Null,
    'Magenta' : IDL.Null,
    'Silver' : IDL.Null,
    'Maroon' : IDL.Null,
  });
  const CartId = IDL.Text;
  const Time = IDL.Int;
  const CartItem = IDL.Record({
    'id' : CartId,
    'time_created' : Time,
    'principal' : IDL.Principal,
    'color' : color,
    'size' : size,
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
  const Result_22 = IDL.Variant({
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
  const Result_21 = IDL.Variant({
    'ok' : WishlistItem,
    'err' : CreateWishlistItemError,
  });
  const ImgId = IDL.Text;
  const SlugId = IDL.Text;
  const Category = IDL.Record({
    'category_img' : ImgId,
    'name' : IDL.Text,
    'slug' : SlugId,
  });
  const CreateCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CategoryAlreadyExists' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyName' : IDL.Null,
  });
  const Result_20 = IDL.Variant({
    'ok' : Category,
    'err' : CreateCategoryError,
  });
  const UserContact = IDL.Record({
    'name' : IDL.Text,
    'read' : IDL.Bool,
    'email' : IDL.Text,
    'message' : IDL.Text,
  });
  const ContactId = IDL.Text;
  const Contact = IDL.Record({
    'id' : ContactId,
    'time_created' : Time,
    'name' : IDL.Text,
    'read' : IDL.Bool,
    'email' : IDL.Text,
    'time_updated' : Time,
    'message' : IDL.Text,
  });
  const CreateContactError = IDL.Variant({
    'EmptyName' : IDL.Null,
    'EmptyMessage' : IDL.Null,
    'EmptyEmail' : IDL.Null,
  });
  const Result_19 = IDL.Variant({ 'ok' : Contact, 'err' : CreateContactError });
  const ShippingAddress = IDL.Record({
    'postCode' : IDL.Text,
    'street' : IDL.Text,
    'country' : IDL.Text,
    'city' : IDL.Text,
    'mail' : IDL.Text,
    'county' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const ProductId = IDL.Nat;
  const OrderProduct = IDL.Record({ 'id' : ProductId, 'quantity' : IDL.Nat8 });
  const NewOrder = IDL.Record({
    'awb' : IDL.Text,
    'paymentStatus' : IDL.Text,
    'paymentMethod' : IDL.Text,
    'shippingAmount' : IDL.Float64,
    'orderStatus' : IDL.Text,
    'userid' : IDL.Principal,
    'paymentAddress' : IDL.Text,
    'totalAmount' : IDL.Float64,
    'shippingAddress' : ShippingAddress,
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
    'shippingAmount' : IDL.Float64,
    'orderStatus' : IDL.Text,
    'userid' : IDL.Principal,
    'paymentAddress' : IDL.Text,
    'timeCreated' : Time,
    'totalAmount' : IDL.Float64,
    'shippingAddress' : ShippingAddress,
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
  const Result_9 = IDL.Variant({ 'ok' : Order, 'err' : OrderError });
  const UserProduct = IDL.Record({
    'title' : IDL.Text,
    'active' : IDL.Bool,
    'inventory' : IDL.Nat,
    'color' : color,
    'size' : size,
    'description' : IDL.Text,
    'category' : SlugId,
    'price' : IDL.Float64,
  });
  const Product = IDL.Record({
    'id' : ProductId,
    'img' : ImgId,
    'time_created' : Time,
    'title' : IDL.Text,
    'active' : IDL.Bool,
    'inventory' : IDL.Nat,
    'color' : color,
    'size' : size,
    'slug' : SlugId,
    'description' : IDL.Text,
    'time_updated' : Time,
    'category' : SlugId,
    'price' : IDL.Float64,
  });
  const CreateProductError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_18 = IDL.Variant({ 'ok' : Product, 'err' : CreateProductError });
  const DeleteCartItemsError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_17 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteCartItemsError,
  });
  const DeleteCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_16 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteCategoryError,
  });
  const DeleteContactError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_15 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteContactError,
  });
  const DeleteOrderError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_14 = IDL.Variant({ 'ok' : IDL.Null, 'err' : DeleteOrderError });
  const DeleteProductError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_13 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteProductError,
  });
  const DeleteWishlistItemError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_12 = IDL.Variant({
    'ok' : IDL.Null,
    'err' : DeleteWishlistItemError,
  });
  const GetCategoryError = IDL.Variant({ 'CategoryNotFound' : IDL.Null });
  const Result_11 = IDL.Variant({ 'ok' : Category, 'err' : GetCategoryError });
  const GetContactError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'ContactNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_10 = IDL.Variant({ 'ok' : Contact, 'err' : GetContactError });
  const GetProductError = IDL.Variant({ 'ProductNotFound' : IDL.Null });
  const Result_8 = IDL.Variant({ 'ok' : Product, 'err' : GetProductError });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'email' : IDL.Text,
    'FirstName' : IDL.Text,
    'LastName' : IDL.Text,
  });
  const GetUserError = IDL.Variant({ 'UserNotFound' : IDL.Null });
  const Result_7 = IDL.Variant({ 'ok' : User, 'err' : GetUserError });
  const UpdateCartItemsError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CartItemNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_6 = IDL.Variant({
    'ok' : CartItem,
    'err' : UpdateCartItemsError,
  });
  const UpdateCategoryError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'CategoryNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyName' : IDL.Null,
  });
  const Result_5 = IDL.Variant({
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
  const Result_4 = IDL.Variant({ 'ok' : Contact, 'err' : UpdateContactError });
  const UpdateOrderError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'OrderNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
  });
  const Result_2 = IDL.Variant({ 'ok' : Order, 'err' : UpdateOrderError });
  const UpdateProductError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'ProductNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_3 = IDL.Variant({ 'ok' : Product, 'err' : UpdateProductError });
  const UpdateUserError = IDL.Variant({
    'UserNotAuthenticated' : IDL.Null,
    'EmptyLastName' : IDL.Null,
    'EmptyFirstName' : IDL.Null,
    'EmptyEmail' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const Result_1 = IDL.Variant({ 'ok' : User, 'err' : UpdateUserError });
  const UpdateWishlistItemError = IDL.Variant({
    'UserNotAdmin' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'WishlistItemNotFound' : IDL.Null,
  });
  const Result = IDL.Variant({
    'ok' : WishlistItem,
    'err' : UpdateWishlistItemError,
  });
  return IDL.Service({
    'addtoCartItems' : IDL.Func(
        [IDL.Text, IDL.Nat8, size, color],
        [Result_22],
        [],
      ),
    'addtoWishlist' : IDL.Func([IDL.Text], [Result_21], []),
    'createCategory' : IDL.Func([IDL.Text, ImgId], [Result_20], []),
    'createContact' : IDL.Func([UserContact], [Result_19], []),
    'createOrder' : IDL.Func([NewOrder], [Result_9], []),
    'createProduct' : IDL.Func(
        [UserProduct, IDL.Opt(IDL.Vec(IDL.Nat8))],
        [Result_18],
        [],
      ),
    'deleteCartItems' : IDL.Func([CartId], [Result_17], []),
    'deleteCategory' : IDL.Func([SlugId], [Result_16], []),
    'deleteContact' : IDL.Func([ContactId], [Result_15], []),
    'deleteOrder' : IDL.Func([OrderId], [Result_14], []),
    'deleteProduct' : IDL.Func([SlugId], [Result_13], []),
    'deleteWishlistItems' : IDL.Func([WishlistId], [Result_12], []),
    'getCallerCartItems' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(CartId, CartItem))],
        ['query'],
      ),
    'getCategory' : IDL.Func([SlugId], [Result_11], ['query']),
    'getContact' : IDL.Func([ContactId], [Result_10], ['query']),
    'getOrder' : IDL.Func([IDL.Text], [Result_9], ['query']),
    'getProduct' : IDL.Func([SlugId], [Result_8], ['query']),
    'getUserdetailsbycaller' : IDL.Func([], [Result_7], ['query']),
    'getUserdetailsbyid' : IDL.Func([IDL.Principal], [Result_7], ['query']),
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
    'updateCartItems' : IDL.Func(
        [CartId, IDL.Nat8, size, color],
        [Result_6],
        [],
      ),
    'updateCategory' : IDL.Func([SlugId, IDL.Text, ImgId], [Result_5], []),
    'updateContact' : IDL.Func([ContactId, IDL.Bool], [Result_4], []),
    'updateOrderStatus' : IDL.Func([OrderId, IDL.Text], [Result_2], []),
    'updateProduct' : IDL.Func(
        [SlugId, UserProduct, IDL.Opt(IDL.Vec(IDL.Nat8))],
        [Result_3],
        [],
      ),
    'updateTrackingUrl' : IDL.Func([OrderId, IDL.Text], [Result_2], []),
    'updateUser' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_1], []),
    'updateWishlistItems' : IDL.Func([WishlistId], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
