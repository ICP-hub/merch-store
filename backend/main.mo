// main.mo

import Types "types";
import Utils "utils";
import List "mo:base/List";
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Memory "mo:base/ExperimentalStableMemory";
import Nat8 "mo:base/Nat8";
import HashMap "mo:base/HashMap";

import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
actor {

    let g = Source.Source();
    //Products

    private let adminPrincipals : [Text] = [];

    // ---------------------------------------------------------------------------------------------------------------------------------------//

    private stable var nextProduct : Types.ProductId = 1;

    private var Users = Map.HashMap<Principal, Types.User>(0, Principal.equal, Principal.hash);
    private stable var stableUsers : [(Principal, Types.User)] = [];

    private var products = Map.HashMap<Types.SlugId, Types.Product>(0, Text.equal, Text.hash);
    private stable var stableproducts : [(Types.SlugId, Types.Product)] = [];

    // -----------------For keeping track of the size and color of the products-------------------

    private var size = Map.HashMap<Types.SlugId, Types.Size>(0, Text.equal, Text.hash);
    private stable var stablesizes : [(Types.SlugId, Types.Size)] = [];

    private var color = Map.HashMap<Types.SlugId, Types.Color>(0, Text.equal, Text.hash);
    private stable var stablecolors : [(Types.SlugId, Types.Color)] = [];

    // --------------------------------------------------------------------------------------------------------------------------
    private var categories = Map.HashMap<Types.SlugId, Types.Category>(0, Text.equal, Text.hash);
    private stable var stablecategories : [(Types.SlugId, Types.Category)] = [];

    private var orders = Map.HashMap<Types.OrderId, Types.Order>(0, Text.equal, Text.hash);
    private stable var stableorders : [(Types.OrderId, Types.Order)] = [];

    private var addressToOrder = Map.HashMap<Text, Types.OrderId>(0, Text.equal, Text.hash);
    private stable var stableaddresstoorder : [(Text, Types.OrderId)] = [];

    private var ratingandreviews = Map.HashMap<Types.SlugId, List.List<Types.ReviewRatings>>(0, Text.equal, Text.hash);
    private stable var stableratingandreviews : [(Types.SlugId, [Types.ReviewRatings])] = [];

    //For processing and storing images
    private stable var currentMemoryOffset : Nat64 = 2;
    private stable var stableimgOffset : [(Types.ImgId, Nat64)] = [];

    private var imgOffset : Map.HashMap<Types.ImgId, Nat64> = Map.fromIter(stableimgOffset.vals(), 0, Text.equal, Text.hash);
    private stable var stableimgSize : [(Types.ImgId, Nat)] = [];

    private var imgSize : Map.HashMap<Types.ImgId, Nat> = Map.fromIter(stableimgSize.vals(), 0, Text.equal, Text.hash);

    private var wishlistItems = Map.HashMap<Types.WishlistId, Types.WishlistItem>(0, Text.equal, Text.hash);
    private var cartItems = Map.HashMap<Types.CartId, Types.CartItem>(0, Text.equal, Text.hash);

    // Contact us

    private var contacts = Map.HashMap<Types.ContactId, Types.Contact>(0, Text.equal, Text.hash);
    private stable var stablecontacts : [(Types.ContactId, Types.Contact)] = [];

    //  *******------------------------   Funtions  -------------------------**********

    //  ------------------------   Users_Functions -------------------------

    public shared ({ caller }) func updateUser(email : Text, firstName : Text, lastName : Text) : async Result.Result<(Types.User), Types.UpdateUserError> {
        /*  if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    }; */
        if (email == "") { return #err(#EmptyEmail) };
        if (firstName == "") { return #err(#EmptyFirstName) };
        if (lastName == "") { return #err(#EmptyLastName) };

        let user = {
            id = caller;
            email = email;
            FirstName = firstName;
            LastName = lastName;
        };

        Users.put(caller, user);
        return #ok(user);

    };

    public query ({ caller }) func getUserdetailsbycaller() : async Result.Result<Types.User, Types.GetUserError> {
        let user = Users.get(caller);
        return Result.fromOption(user, #UserNotFound);
    };

    public query ({ caller }) func getUserdetailsbyid(id : Principal) : async Result.Result<Types.User, Types.GetUserError> {
        let user = Users.get(id);
        return Result.fromOption(user, #UserNotFound);
    };

    public query ({ caller }) func listUsers() : async [(Principal, Types.User)] {
        return Iter.toArray(Users.entries());
    };

    //  ------------------   Products_Functions ----------------

    public shared ({ caller }) func createProduct(p : Types.UserProduct, img : ?Blob) : async Result.Result<(Types.Product), Types.CreateProductError> {

        if (p.title == "") { return #err(#EmptyTitle) };

        let productId = nextProduct;
        nextProduct += 1;
        // increment the counter so we never try to create a product under the same index

        let newSlug = Utils.slugify(p.title) # "-" # Nat.toText(nextProduct); //this should keep slug always unique and we can key hashMap with it

        var imgSlug : Types.SlugId = "";
        switch (img) {
            case null {
                // do nothing if there is no image attached
            };
            case (?imageBlob) {
                storeBlobImg(newSlug, imageBlob);
                imgSlug := newSlug;
            };
        };

        let product : Types.Product = {
            title = p.title;
            id = productId;
            price = p.price;
            category = p.category;
            inventory = p.inventory;
            description = p.description;
            active = p.active;
            newArrival = p.newArrival;
            trending = p.trending;
            // ratingandreview = p.ratingandreview;
            img = "";
            slug = newSlug;
            time_created = Time.now();
            time_updated = Time.now();
        };

        products.put(newSlug, product);
        return #ok(product);
    };

    public shared (msg) func updateProduct(
        id : Types.SlugId,
        p : Types.UserProduct,
        img : ?Blob,
    ) : async Result.Result<(Types.Product), Types.UpdateProductError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };
        if (Utils.isAdmin(msg.caller)) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };

        if (p.title == "") {
            return #err(#EmptyTitle);
        };

        let result = products.get(id);
        switch (result) {
            case null {
                // If the result is null, we return a ProductNotFound error.
                return #err(#ProductNotFound);
            };
            case (?v) {
                //If the product was found, we try to update it.
                var imgSlug : Types.SlugId = v.img;
                switch (img) {
                    case null {
                        // do nothing if there is no image update
                    };
                    case (?imageBlob) {
                        storeBlobImg(v.slug, imageBlob);
                        imgSlug := v.slug;
                    };
                };

                let product : Types.Product = {
                    title = p.title;
                    id = v.id;
                    price = p.price;
                    category = p.category;
                    inventory = p.inventory;
                    description = p.description;
                    active = p.active;
                    trending = p.trending;
                    newArrival = p.newArrival;
                    img = imgSlug;
                    // keep persistent URLS
                    slug = v.slug;
                    time_created = v.time_created;
                    // only update time_updated
                    time_updated = Time.now();
                };
                products.put(id, product);
                return #ok(product);
            };
        };
    };
    // Delete the Products
    public shared (msg) func deleteProduct(id : Types.SlugId) : async Result.Result<(), Types.DeleteProductError> {
        if (Utils.isAdmin(msg.caller)) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        products.delete(id);
        return #ok(());
    };

    // query Products

    public query func getProduct(id : Types.SlugId) : async Result.Result<Types.Product, Types.GetProductError> {
        let product = products.get(id);
        return Result.fromOption(product, #ProductNotFound);
        // If the post is not found, this will return an error as result.
    };

    public query func listallProducts() : async [(Types.SlugId, Types.Product)] {
        return Iter.toArray(products.entries());
    };

    // --------------------------Searching Functions----------------------------------------------------------

    public query func searchproductsbytitle(title : Text) : async [(Types.SlugId, Types.Product)] {
        let result = HashMap.mapFilter<Types.SlugId, Types.Product, Types.Product>(
            products,
            Text.equal,
            Text.hash,
            func(k : Types.SlugId, v : Types.Product) : ?Types.Product {
                if (v.title == title) {
                    return ?v; // Include this item
                } else {
                    return null; // Exclude this item
                };
            },
        );
        return Iter.toArray(result.entries());
    };

    public query func searchproductsbycategory(category : Types.SlugId) : async [(Types.SlugId, Types.Product)] {
        let result = HashMap.mapFilter<Types.SlugId, Types.Product, Types.Product>(
            products, // The HashMap to filter which is of type HashMap<SlugId, Product>
            Text.equal,
            Text.hash,
            func(k : Types.SlugId, v : Types.Product) : ?Types.Product {
                if (v.category == category) {
                    return ?v; // Include this item
                } else {
                    return null; // Exclude this item
                };
            },
        );
        return Iter.toArray(result.entries());
    };

    //--------------------------------  Image_processionf as blobs    --------------------------------------------------------------------------------------//

    private func storeBlobImg(imgId : Types.ImgId, value : Blob) {
        var size : Nat = Nat32.toNat(Nat32.fromIntWrap(value.size()));
        // Each page is 64KiB (65536 bytes)
        var growBy : Nat = size / 65536 + 1;
        let a = Memory.grow(Nat64.fromNat(growBy));
        Memory.storeBlob(currentMemoryOffset, value);
        imgOffset.put(imgId, currentMemoryOffset);
        imgSize.put(imgId, size);
        size := size + 4;
        currentMemoryOffset += Nat64.fromNat(size);
    };

    private func loadBlobImg(imgId : Types.ImgId) : ?Blob {
        let offset = imgOffset.get(imgId);
        switch (offset) {
            case (null) {
                return null;
            };
            case (?offset) {
                let size = imgSize.get(imgId);
                switch (size) {
                    case (null) {
                        return null;
                    };
                    case (?size) {
                        return ?Memory.loadBlob(offset, size);
                    };
                };
            };
        };
    };

    // ------------------------------------  Categories_Functions  ---------------------------------------------

    public shared (msg) func createCategory(name : Text, cat_img : Types.ImgId) : async Result.Result<(Types.Category), Types.CreateCategoryError> {

        if (name == "") { return #err(#EmptyName) };

        let new_slug = Utils.slugify(name);

        let result = categories.get(new_slug);
        switch (result) {
            case null {
                let category : Types.Category = {
                    name = name;
                    slug = new_slug;
                    category_img = cat_img;
                };

                categories.put(new_slug, category);
                return #ok(category);
            };
            case (?v) {
                // We want category to exist only once
                return #err(#CategoryAlreadyExists);
            };
        };
    };

    public shared (msg) func updateCategory(
        id : Types.SlugId,
        name : Text,
        cat_img : Types.ImgId,
    ) : async Result.Result<(Types.Category), Types.UpdateCategoryError> {
        if (Utils.isAdmin(msg.caller)) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };

        if (name == "") {
            return #err(#EmptyName);
        };

        let result = categories.get(id);

        switch (result) {
            case null {
                return #err(#CategoryNotFound);
            };
            case (?v) {
                let category : Types.Category = {
                    name = name;
                    slug = v.slug;
                    category_img = cat_img;

                };
                categories.put(id, category);
                return #ok(category);
            };
        };
    };

    public query func getCategory(id : Types.SlugId) : async Result.Result<Types.Category, Types.GetCategoryError> {
        let category = categories.get(id);
        return Result.fromOption(category, #CategoryNotFound);
        // If the post is not found, this will return an error as result.
    };

    public shared (msg) func deleteCategory(id : Types.SlugId) : async Result.Result<(), Types.DeleteCategoryError> {
        // if(Utils.isAdmin(msg.caller)){
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        // if(Principal.isAnonymous(msg.caller)){
        //     return #err(#UserNotAuthenticated);
        // };
        categories.delete(id);
        return #ok(());
    };

    public query func listCategories() : async [(Types.SlugId, Types.Category)] {
        return Iter.toArray(categories.entries());
    };

    //  -----------------------------------   Wishlist_Functions ---------------------------------------------------------------------------------------------------------

    public shared (msg) func addtoWishlist(product_slug : Text) : async Result.Result<(Types.WishlistItem), Types.CreateWishlistItemError> {

        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };

        if (product_slug == "") { return #err(#EmptyProductSlug) };

        let wishlistId : Types.WishlistId = UUID.toText(await g.new());

        let userP : Principal = msg.caller;

        let wishlistItem : Types.WishlistItem = {
            id = wishlistId;
            product_slug = product_slug;
            principal = userP;
            time_created = Time.now();
            time_updated = Time.now();
        };

        wishlistItems.put(wishlistId, wishlistItem);
        return #ok(wishlistItem);

    };

    public shared (msg) func updateWishlistItems(
        id : Types.WishlistId
    ) : async Result.Result<(Types.WishlistItem), Types.UpdateWishlistItemError> {
        // commented for local development
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };

        let result = wishlistItems.get(id);
        switch (result) {
            case null {
                // If the result is null, we return a ProductNotFound error.
                return #err(#WishlistItemNotFound);
            };
            case (?v) {

                let wishlistItem : Types.WishlistItem = {
                    id = v.id;
                    product_slug = v.product_slug;
                    principal = v.principal;
                    time_created = v.time_created;
                    time_updated = Time.now();
                };
                wishlistItems.put(id, wishlistItem);
                return #ok(wishlistItem);
            };
        };
    };

    public shared (msg) func deleteWishlistItems(id : Types.WishlistId) : async Result.Result<(), Types.DeleteWishlistItemError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        wishlistItems.delete(id);
        return #ok(());
    };

    public query func listWishlistItems() : async [(Types.WishlistId, Types.WishlistItem)] {

        return Iter.toArray(wishlistItems.entries());
    };

    //  -----------------------------------   Cart_Functions -----------------------------------------------------------------------------------------------------------------

    public shared (msg) func addtoCartItems(product_slug : Text, qty : Nat8, size : Types.Size, color : Types.Color) : async Result.Result<(Types.CartItem), Types.CreateCartItemsError> {

        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };

        if (product_slug == "") { return #err(#EmptyProductSlug) };

        let cartId : Types.CartId = UUID.toText(await g.new());

        let userP : Principal = msg.caller;

        let cartItem : Types.CartItem = {
            id = cartId;
            product_slug = product_slug;
            principal = userP;
            size = size;
            color = color;
            quantity = qty;
            time_created = Time.now();
            time_updated = Time.now();
        };

        cartItems.put(cartId, cartItem);
        return #ok(cartItem);

    };

    public shared (msg) func updateCartItems(
        id : Types.CartId,
        qty : Nat8,
        size : Types.Size,
        color : Types.Color,
    ) : async Result.Result<(Types.CartItem), Types.UpdateCartItemsError> {
        // commented for local development
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };

        let result = cartItems.get(id);
        switch (result) {
            case null {
                // If the result is null, we return a ProductNotFound error.
                return #err(#CartItemNotFound);
            };
            case (?v) {

                let cartItem : Types.CartItem = {
                    id = v.id;
                    product_slug = v.product_slug;
                    principal = v.principal;
                    size = size;
                    color = color;
                    quantity = qty;
                    time_created = v.time_created;
                    time_updated = Time.now();
                };
                cartItems.put(id, cartItem);
                return #ok(cartItem);
            };
        };
    };

    public shared (msg) func deleteCartItems(id : Types.CartId) : async Result.Result<(), Types.DeleteCartItemsError> {

        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        cartItems.delete(id);
        return #ok(());
    };

    public query (msg) func getCallerCartItems() : async [(Types.CartId, Types.CartItem)] {
        // Assuming `cartItems` is your existing HashMap<CartId, CartItem>
        let caller = msg.caller;

        // Filter cartItems to include only those belonging to `caller`
        let filteredCartItems = HashMap.mapFilter<Types.CartId, Types.CartItem, Types.CartItem>(
            cartItems,
            Text.equal,
            Text.hash,
            func(k : Types.CartId, v : Types.CartItem) : ?Types.CartItem {
                if (v.principal == caller) {
                    return ?v; // Include this item
                } else {
                    return null; // Exclude this item
                };
            },
        );
        return Iter.toArray(filteredCartItems.entries());
    };

    //  -----------------------------------   Orders_Functions --------------------------------------------------------------------------------------------

    public shared (msg) func createOrder(order : Types.NewOrder) : async Result.Result<Types.Order, Types.OrderError> {
        return switch (addressToOrder.get(order.paymentAddress)) {
            case (?order) return #err(#PaymentAddressAlreadyUsed);
            case null {
                let orderId : Types.OrderId = UUID.toText(await g.new());

                var newOrder : Types.Order = {
                    id = orderId;
                    shippingAddress = order.shippingAddress;
                    products = order.products;
                    userid = msg.caller;
                    totalAmount = order.totalAmount;
                    subTotalAmount = order.subTotalAmount;
                    shippingAmount = order.shippingAmount;
                    orderStatus = order.orderStatus;
                    paymentStatus = order.paymentStatus;
                    paymentAddress = order.paymentAddress;
                    paymentMethod = order.paymentMethod;
                    awb = order.awb;
                    timeCreated = Time.now();
                    timeUpdated = Time.now();
                };

                orders.put(orderId, newOrder);
                addressToOrder.put(newOrder.paymentAddress, newOrder.id);

                return #ok(newOrder);
            };
        };
    };

    public shared (msg) func updateTrackingUrl(id : Types.OrderId, awb : Text) : async Result.Result<(Types.Order), Types.UpdateOrderError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        let userPrincipalStr = Principal.toText(msg.caller);

        // Check if the caller is an admin
        let isAdmin = Array.find<Text>(
            adminPrincipals,
            func(adminPrincipal : Text) : Bool {
                return userPrincipalStr == adminPrincipal;
            },
        );

        switch (isAdmin) {
            case null { return #err(#UserNotAdmin) };
            case _ {};
        };

        let result = orders.get(id);
        switch (result) {
            case null {
                return #err(#OrderNotFound);
            };
            case (?v) {
                let order : Types.Order = {
                    id = v.id;
                    shippingAddress = v.shippingAddress;
                    products = v.products;
                    userid = v.userid;
                    totalAmount = v.totalAmount;
                    subTotalAmount = v.subTotalAmount;
                    shippingAmount = v.shippingAmount;
                    orderStatus = v.orderStatus;
                    paymentStatus = v.paymentStatus;
                    paymentAddress = v.paymentAddress;
                    paymentMethod = v.paymentMethod;
                    awb = awb;
                    timeCreated = v.timeCreated;
                    timeUpdated = Time.now();
                };
                orders.put(id, order);
                return #ok(order);
            };
        };
    };

    public shared (msg) func updateOrderStatus(id : Types.OrderId, orderStatus : Text) : async Result.Result<(Types.Order), Types.UpdateOrderError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        let userPrincipalStr = Principal.toText(msg.caller);

        // Check if the caller is an admin
        let isAdmin = Array.find<Text>(
            adminPrincipals,
            func(adminPrincipal : Text) : Bool {
                return userPrincipalStr == adminPrincipal;
            },
        );

        switch (isAdmin) {
            case null { return #err(#UserNotAdmin) };
            case _ {};
        };

        let result = orders.get(id);
        switch (result) {
            case null {
                return #err(#OrderNotFound);
            };
            case (?v) {
                let order : Types.Order = {
                    id = v.id;
                    shippingAddress = v.shippingAddress;
                    products = v.products;
                    userid = v.userid;
                    totalAmount = v.totalAmount;
                    subTotalAmount = v.subTotalAmount;
                    shippingAmount = v.shippingAmount;
                    orderStatus = orderStatus;
                    paymentStatus = v.paymentStatus;
                    paymentAddress = v.paymentAddress;
                    paymentMethod = v.paymentMethod;
                    awb = v.awb;
                    timeCreated = v.timeCreated;
                    timeUpdated = Time.now();
                };
                orders.put(id, order);
                return #ok(order);
            };
        };
    };
    // Admin can see all orders
    public query (msg) func listallOrders() : async [(Types.OrderId, Types.Order)] {

        return Iter.toArray(orders.entries());
    };

    // Users can see their orders

    public query (msg) func listUserOrders() : async [(Types.OrderId, Types.Order)] {
        let caller = msg.caller;

        // Filter orders to include only those belonging to `caller`
        let filteredOrders = HashMap.mapFilter<Types.OrderId, Types.Order, Types.Order>(
            orders,
            Text.equal,
            Text.hash,
            func(k : Types.OrderId, v : Types.Order) : ?Types.Order {
                if (v.userid == caller) {
                    return ?v; // Include this item
                } else {
                    return null; // Exclude this item
                };
            },
        );
        return Iter.toArray(filteredOrders.entries());
    };

    // get order by id
    public query func getOrder(orderId : Text) : async Result.Result<Types.Order, Types.OrderError> {
        let order = orders.get(orderId);
        return Result.fromOption(order, #OrderNotFound);
    };

    public shared (msg) func deleteOrder(id : Types.OrderId) : async Result.Result<(), Types.DeleteOrderError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        let userPrincipalStr = Principal.toText(msg.caller);

        // Check if the caller is an admin
        let isAdmin = Array.find<Text>(
            adminPrincipals,
            func(adminPrincipal : Text) : Bool {
                return userPrincipalStr == adminPrincipal;
            },
        );

        switch (isAdmin) {
            case null { return #err(#UserNotAdmin) };
            case _ {};
        };
        orders.delete(id);
        return #ok(());
    };

    //--------------------------------  Contact_Functions  --------------------------------------------------------------------------------

    public shared (msg) func createContact(co : Types.UserContact) : async Result.Result<(Types.Contact), Types.CreateContactError> {

        if (co.name == "") { return #err(#EmptyName) };
        if (co.email == "") { return #err(#EmptyEmail) };
        if (co.message == "") { return #err(#EmptyMessage) };

        let contactId : Types.ContactId = UUID.toText(await g.new());

        let contact : Types.Contact = {
            id = contactId;
            name = co.name;
            email = co.email;
            message = co.message;
            read = co.read;
            time_created = Time.now();
            time_updated = Time.now();
        };

        contacts.put(contactId, contact);
        return #ok(contact);
    };

    public shared (msg) func updateContact(
        id : Types.ContactId,
        read : Bool,
    ) : async Result.Result<(Types.Contact), Types.UpdateContactError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        let userPrincipalStr = Principal.toText(msg.caller);

        // Check if the caller is an admin
        let isAdmin = Array.find<Text>(
            adminPrincipals,
            func(adminPrincipal : Text) : Bool {
                return userPrincipalStr == adminPrincipal;
            },
        );

        switch (isAdmin) {
            case null { return #err(#UserNotAdmin) };
            case _ {};
        };

        let result = contacts.get(id);
        switch (result) {
            case null {
                return #err(#ContactNotFound);
            };
            case (?v) {
                let contact : Types.Contact = {
                    id = id;
                    email = v.email;
                    name = v.name;
                    message = v.message;
                    read = read;
                    time_created = v.time_created;
                    // only update time_updated
                    time_updated = Time.now();
                };
                contacts.put(id, contact);
                return #ok(contact);
            };
        };
    };

    public query func getContact(id : Types.ContactId) : async Result.Result<Types.Contact, Types.GetContactError> {
        let contact = contacts.get(id);
        return Result.fromOption(contact, #ContactNotFound);
        // If the post is not found, this will return an error as result.
    };

    public shared (msg) func deleteContact(id : Types.ContactId) : async Result.Result<(), Types.DeleteContactError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        let userPrincipalStr = Principal.toText(msg.caller);

        // Check if the caller is an admin
        let isAdmin = Array.find<Text>(
            adminPrincipals,
            func(adminPrincipal : Text) : Bool {
                return userPrincipalStr == adminPrincipal;
            },
        );

        switch (isAdmin) {
            case null { return #err(#UserNotAdmin) };
            case _ {};
        };
        contacts.delete(id);
        return #ok(());
    };

    public query func listContacts() : async [(Types.ContactId, Types.Contact)] {
        return Iter.toArray(contacts.entries());
    };

    // ----------------------------------------Rivew & Ratings functions-------------------------------------------------------------

    // public shared ({ caller }) func addReviewRating(product_slug : Text, review : Text, rating : ?Types.Rating) : async Result.Result<(Types.ReviewRatings), Types.CreateReviewError> {
    //     let userP : Principal = caller;
    //     if (product_slug == "") { return #err(#EmptyProduct_slug) };
    //     switch (products.get(product_slug)) {
    //         case null { return #err(#ProductNotFound) };
    //         case (?v) {
    //             switch (rating) {
    //                 case null { return #err(#EmptyRating) };
    //                 case (?rating) {
    //                     switch (ratingandreviews.get(product_slug)) {
    //                         case null {
    //                             if (List.isNil<Types.ReviewRatings>() == true ){

    //                             };
    //                             let reviewRating : Types.ReviewRatings = {
    //                                 product_slug = product_slug;
    //                                 review = review;
    //                                 rating = rating;
    //                                 principal = userP;
    //                                 time_created = Time.now();
    //                                 time_updated = Time.now();
    //                             };
    //                             ratingandreviews.put(product_slug, [reviewRating]);
    //                             return #ok(reviewRating);
    //                         };
    //                         case (?v) {
    //                             let reviewRating : Types.ReviewRatings = {
    //                                 product_slug = product_slug;
    //                                 review = review;
    //                                 rating = rating;
    //                                 principal = userP;
    //                                 time_created = Time.now();
    //                                 time_updated = Time.now();
    //                             };
    //                             List.toArray(List.push(List.fromArray(v), reviewRating));
    //                             ratingandreviews.put(product_slug, v);
    //                             return #ok(reviewRating);
    //                         };
    //                     };
    //                 };
    //             };
    //         };
    //     };
    // };
    // --------------------------  Stablising functions to store data   --------------------------------------------------------------

    // Stablising the data
    // Preupgrade function to store the data in stable variables
    system func preupgrade() {
        stableproducts := Iter.toArray(products.entries());
        stablecategories := Iter.toArray(categories.entries());
        stableorders := Iter.toArray(orders.entries());
        stableaddresstoorder := Iter.toArray(addressToOrder.entries());
        stableimgOffset := Iter.toArray(imgOffset.entries());
        stableimgSize := Iter.toArray(imgSize.entries());
        stablecontacts := Iter.toArray(contacts.entries());
    };

    // Postupgrade function to restore the data from stable variables
    system func postupgrade() {
        products := Map.fromIter<Types.SlugId, Types.Product>(
            stableproducts.vals(),
            10,
            Text.equal,
            Text.hash,
        );
        categories := Map.fromIter<Types.SlugId, Types.Category>(
            stablecategories.vals(),
            10,
            Text.equal,
            Text.hash,
        );
        orders := Map.fromIter<Types.OrderId, Types.Order>(
            stableorders.vals(),
            10,
            Text.equal,
            Text.hash,
        );
        addressToOrder := Map.fromIter<Text, Types.OrderId>(
            stableaddresstoorder.vals(),
            10,
            Text.equal,
            Text.hash,
        );
        stableimgOffset := [];
        stableimgSize := [];
        stablecontacts := [];
    };

};
