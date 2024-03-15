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

    // ---------------------------------------------------------------------------------------------------------------------------------------//

    private stable var nextProduct : Types.ProductId = 1;

    private var Users = Map.HashMap<Principal, Types.User>(0, Principal.equal, Principal.hash);
    private stable var stableUsers : [(Principal, Types.User)] = [];

    private var products = Map.HashMap<Types.SlugId, Types.Product>(0, Text.equal, Text.hash);
    private stable var stableproducts : [(Types.SlugId, Types.Product)] = [];

    private stable var shippingamount : Types.ShippingAmount = {
        shipping_amount = 50.0;
    };

    // -----------------For keeping track of the size and color of the products-------------------

    // private var size = Map.HashMap<Types.SlugId, Types.Size>(0, Text.equal, Text.hash);
    // private stable var stablesizes : [(Types.SlugId, Types.Size)] = [];

    // private var color = Map.HashMap<Types.SlugId, Types.Color>(0, Text.equal, Text.hash);
    // private stable var stablecolors : [(Types.SlugId, Types.Color)] = [];

    private var variants = Map.HashMap<Types.SlugId, Types.Variants>(0, Text.equal, Text.hash); //! Here Variant Slug will be the key
    private stable var stablevariants : [(Types.SlugId, Types.Variants)] = [];

    private var usersaddresslist = Map.HashMap<Principal, [Types.Address]>(0, Principal.equal, Principal.hash);
    private stable var stableusersaddresslist : [(Principal, [Types.Address])] = [];

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
    // private stable var currentMemoryOffset : Nat64 = 2;
    // private stable var stableimgOffset : [(Types.ImgI, Nat64)] = [];

    // private var imgOffset : Map.HashMap<Types.ImgId, Nat64> = Map.fromIter(stableimgOffset.vals(), 0, Text.equal, Text.hash);
    // private stable var stableimgSize : [(Types.ImgId, Nat)] = [];

    // private var imgSize : Map.HashMap<Types.ImgId, Nat> = Map.fromIter(stableimgSize.vals(), 0, Text.equal, Text.hash);

    private var wishlistItems = Map.HashMap<Types.WishlistId, Types.WishlistItem>(0, Text.equal, Text.hash);
    private var cartItems = Map.HashMap<Types.CartId, Types.CartItem>(0, Text.equal, Text.hash);

    // Contact us
    private var contacts = Map.HashMap<Types.ContactId, Types.Contact>(0, Text.equal, Text.hash);
    private stable var stablecontacts : [(Types.ContactId, Types.Contact)] = [];

    //  *******------------------------   Funtions  -------------------------**********

    //
    private let adminPrincipals : [Text] = [
        "7yywi-leri6-n33rr-vskr6-yb4nd-dvj6j-xg2b4-reiw6-dljs7-slclz-2ae",
        "jkssc-r7bft-rhxnv-xskty-gwy2y-nabjd-asvau-ijwcf-nyvbq-dcazp-zae",
        "h7yxq-n6yb2-6js2j-af5hk-h4inj-edrce-oevyj-kbs7a-76kft-vrqrw-nqe",
        "uktss-xp5gu-uwif5-hfpwu-rujms-foroa-4zdkd-ofspf-uqqre-wxqyj-cqe",
    ];

    public func isAdmin(userPrincipal : Principal) : async Bool {
        let userPrincipalStr = Principal.toText(userPrincipal);
        let foundAdmin = Array.find<Text>(
            adminPrincipals,
            func(adminPrincipal : Text) : Bool {
                return userPrincipalStr == adminPrincipal;
            },
        );
        switch (foundAdmin) {
            case (null) { return false };
            case (?v) { return true };
        };
    };

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
            firstName = firstName;
            lastName = lastName;
        };
        Users.put(caller, user);
        return #ok(user);
    };

    public shared query ({ caller }) func getUserdetailsbycaller() : async Result.Result<Types.User, Types.GetUserError> {
        let user = Users.get(caller);
        return Result.fromOption(user, #UserNotFound);
    };

    public shared query ({ caller }) func getUserdetailsbyid(id : Principal) : async Result.Result<Types.User, Types.GetUserError> {
        let user = Users.get(id);
        return Result.fromOption(user, #UserNotFound);
    };

    public query func listUsers() : async [(Principal, Types.User)] {
        return Iter.toArray(Users.entries());
    };

    //  ***************************************** Users Address CRUD Operations *****************************************************
    public shared ({ caller }) func createAddress(
        userAddress : Types.UserAddress
    ) : async Result.Result<(Types.Address), Types.CreateAddressError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };
        let userP : Principal = caller;

        let address = {
            id = UUID.toText(await g.new());
            firstname = userAddress.firstname;
            lastname = userAddress.lastname;
            email = userAddress.email;
            phone_number = userAddress.phone_number;
            address_type = userAddress.address_type;
            addressline1 = userAddress.addressline1;
            addressline2 = userAddress.addressline2;
            city = userAddress.city;
            state = userAddress.state;
            country = userAddress.country;
            pincode = userAddress.pincode;
        };

        let usersAddresses = usersaddresslist.get(userP);
        switch (usersAddresses) {
            case null {
                let newAddresses = [address];
                usersaddresslist.put(userP, newAddresses);
                return #ok(address);
            };
            case (?existingAddresses) {
                let temp = List.push(address, List.fromArray(existingAddresses));
                usersaddresslist.put(userP, List.toArray(temp));
                return #ok(address);
            };
        };
    };

    public shared ({ caller }) func updateAddress(address : Types.Address, id : Text, callerP : Principal) : async Result.Result<(Types.Address), Types.UpdateAddressError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };
        if (Result.isErr(await getUserdetailsbyid(callerP))) {
            return #err(#AddressNotFound);
        };
        let address_id : Text = UUID.toText(await g.new());
        let userP : Principal = callerP;
        let userAddresses = usersaddresslist.get(userP);
        switch (userAddresses) {
            case null {
                return #err(#AddressNotFound);
            };
            case (?existingAddresses) {
                let tempaddresslist = List.fromArray(existingAddresses);
                var oldaddress = List.find<Types.Address>(
                    tempaddresslist,
                    func(a : Types.Address) : Bool {
                        return a.id == address_id;
                    },
                );
                switch (oldaddress) {
                    case (null) {
                        return #err(#AddressNotFound);
                    };
                    case (?a) {
                        let newaddress : Types.Address = {
                            id = id;
                            firstname = address.firstname;
                            lastname = address.lastname;
                            email = address.email;
                            phone_number = address.phone_number;
                            address_type = address.address_type;
                            addressline1 = address.addressline1;
                            addressline2 = address.addressline2;
                            city = address.city;
                            state = address.state;
                            country = address.country;
                            pincode = address.pincode;
                        };
                        //* Here I have created a new list with Item those are not similar to the address we are updating and then we are adding the new address to the list
                        let updatedAddresses = List.filter<Types.Address>(
                            tempaddresslist,
                            func(a : Types.Address) : Bool {
                                return a.id != address_id;
                            },
                        );
                        // addew address to the list and then pushing it to the hashmap
                        let newAddresses = List.push(newaddress, updatedAddresses);
                        usersaddresslist.put(userP, List.toArray(newAddresses));
                        return #ok(newaddress);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func getAddress(address_type : Text) : async Result.Result<Types.Address, Types.GetAddressError> {
        let userP : Principal = caller;
        let userAddresses = usersaddresslist.get(userP);
        switch (userAddresses) {
            case null {
                return #err(#AddressNotFound);
            };
            case (?existingAddresses) {
                let tempaddresslist = List.fromArray(existingAddresses);
                var address = List.find<Types.Address>(
                    tempaddresslist,
                    func(a : Types.Address) : Bool {
                        return a.address_type == address_type;
                    },
                );
                switch (address) {
                    case (null) {
                        return #err(#AddressNotFound);
                    };
                    case (?a) {
                        return #ok(a);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func deleteaddress(address_type : Text) : async Result.Result<(), Types.DeleteAddressError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };
        let userP : Principal = caller;
        let userAddresses = usersaddresslist.get(userP);
        switch (userAddresses) {
            case null {
                return #err(#AddressNotFound);
            };
            case (?existingAddresses) {
                let tempaddresslist = List.fromArray(existingAddresses);
                let updatedAddresses = List.filter<Types.Address>(
                    tempaddresslist,
                    func(a : Types.Address) : Bool {
                        return a.address_type != address_type;
                    },
                );
                usersaddresslist.put(userP, List.toArray(updatedAddresses));
                return #ok(());
            };
        };
    };

    public query ({ caller }) func listUserAddresses() : async [(Principal, [Types.Address])] {
        let userP = caller;
        let userAddresses = usersaddresslist.get(userP);
        switch (userAddresses) {
            case null {
                return [];
            };
            case (?existingAddresses) {
                return [(userP, existingAddresses)];
            };
        };
    };

    // **************************** Variant Functions **********************************

    public shared (msg) func createVariant(
        product_slug : Types.SlugId,
        size : Text,
        color : Text,
        inventory : Nat,
        variant_price : Float,
        variant_sale_price : Float

    ) : async Result.Result<(Types.Variants), Types.CreateVariantError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };
        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };

        if (size == "") {
            return #err(#EmptySize);
        };
        if (color == "") {
            return #err(#EmptyColor);
        };

        let variantId = Utils.slugify(color) # "-" # (size);

        let variant : Types.Variants = {
            variant_slug = variantId;
            product_slug = product_slug;
            size = size;
            color = color;
            variant_price = variant_price;
            variant_sale_price = variant_sale_price;
            inventory = inventory;
        };

        variants.put(variantId, variant);
        return #ok(variant);
    };

    public shared ({ caller }) func deletevariant(variant_slug : Types.SlugId) : async Result.Result<(), Types.DeleteVariantError> {
        let adminstatus = await isAdmin(caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };
        variants.delete(variant_slug);
        return #ok(());
    };

    public shared ({ caller }) func updatevariant(
        variant_slug : Types.SlugId,
        size : Text,
        color : Text,
        inventory : Nat,
        variant_price : Float,
        variant_sale_price : Float,
    ) : async Result.Result<(Types.Variants), Types.UpdateVariantError> {
        let adminstatus = await isAdmin(caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };

        if (size == "") {
            return #err(#EmptySize);
        };
        if (color == "") {
            return #err(#EmptyColor);
        };

        let result = variants.get(variant_slug);
        switch (result) {
            case null {
                return #err(#VariantNotFound);
            };
            case (?v) {
                let variant : Types.Variants = {
                    variant_slug = v.variant_slug;
                    product_slug = v.product_slug;
                    size = size;
                    color = color;
                    variant_price = variant_price;
                    variant_sale_price = variant_sale_price;
                    inventory = inventory;
                };
                variants.put(variant_slug, variant);
                return #ok(variant);
            };
        };
    };

    public shared ({ caller }) func getvariant(variant_slug : Types.SlugId) : async Result.Result<Types.Variants, Types.GetVariantError> {
        let variant = variants.get(variant_slug);
        return Result.fromOption(variant, #VariantNotFound);
    };

    //  ------------------   Products_Functions ----------------

    public shared ({ caller }) func createProduct(p : Types.UserProduct, vs : [Types.VariantSize], vc : [Types.VariantColor]) : async Result.Result<(Types.Product), Types.CreateProductError> {

        let adminstatus = await isAdmin(caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };

        if (p.title == "") { return #err(#EmptyTitle) };

        let productId = nextProduct;
        nextProduct += 1;
        // increment the counter so we never try to create a product under the same index

        let newSlug = Utils.slugify(p.title) # "-" # Nat.toText(nextProduct); //this should keep slug always unique and we can key hashMap with it

        // var imgSlug : Types.SlugId = "";
        // switch (img) {
        //     case null {
        //         // do nothing if there is no image attached
        //     };
        //     case (?imageBlob) {
        //         storeBlobImg(newSlug, imageBlob);
        //         imgSlug := newSlug;
        //     };
        // };

        let product : Types.Product = {
            title = p.title;
            id = productId;
            //price = p.price;
            //sellingPrice = p.sellingPrice;
            category = p.category;
            description = p.description;
            active = p.active;
            newArrival = p.newArrival;
            trending = p.trending;
            variantSize = vs;
            variantColor = vc;
            //img = img;
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
        vs : [Types.VariantSize],
        vc : [Types.VariantColor],
        //img : Text,
    ) : async Result.Result<(Types.Product), Types.UpdateProductError> {
        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
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
                // var imgSlug : Types.SlugId = v.img;
                // switch (img) {
                //     case null {
                //         // do nothing if there is no image update
                //     };
                //     case (?imageBlob) {
                //         storeBlobImg(v.slug, imageBlob);
                //         imgSlug := v.slug;
                //     };
                // };

                let product : Types.Product = {
                    title = p.title;
                    id = v.id;
                    //price = p.price;
                    //sellingPrice = p.sellingPrice;
                    category = p.category;
                    description = p.description;
                    active = p.active;
                    trending = p.trending;
                    newArrival = p.newArrival;
                    variantSize = vs;
                    variantColor = vc;
                    //img = img;
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
        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };
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

    //--------------------------------  Image_procession as blobs    --------------------------------------------------------------------------------------//

    // private func storeBlobImg(imgId : Types.ImgId, value : Blob) {
    //     var size : Nat = Nat32.toNat(Nat32.fromIntWrap(value.size()));
    //     // Each page is 64KiB (65536 bytes)
    //     var growBy : Nat = size / 65536 + 1;
    //     let a = Memory.grow(Nat64.fromNat(growBy));
    //     Memory.storeBlob(currentMemoryOffset, value);
    //     imgOffset.put(imgId, currentMemoryOffset);
    //     imgSize.put(imgId, size);
    //     size := size + 4;
    //     currentMemoryOffset += Nat64.fromNat(size);
    // };

    // private func loadBlobImg(imgId : Types.ImgId) : ?Blob {
    //     let offset = imgOffset.get(imgId);
    //     switch (offset) {
    //         case (null) {
    //             return null;
    //         };
    //         case (?offset) {
    //             let size = imgSize.get(imgId);
    //             switch (size) {
    //                 case (null) {
    //                     return null;
    //                 };
    //                 case (?size) {
    //                     return ?Memory.loadBlob(offset, size);
    //                 };
    //             };
    //         };
    //     };
    // };

    // public query func http_request(request : Types.Request) : async Types.Response {
    //     if (Text.contains(request.url, #text("imgid"))) {
    //         let imgId = Iter.toArray(Text.tokens(request.url, #text("imgid=")))[1];
    //         var pic = loadBlobImg(imgId);
    //         switch (pic) {
    //             case (null) {
    //                 return Utils.http404(?"no picture available");
    //             };
    //             case (?existingPic) {
    //                 return Utils.picture(existingPic);
    //             };
    //         };
    //     };
    //     return Utils.http404(?"Path not found.");
    // };

    // ------------------------------------  CATEGORY_FUNCTIONS  ---------------------------------------------

    public shared (msg) func createCategory(name : Text, cat_img : Text, featured : Bool, active : Bool) : async Result.Result<(Types.Category), Types.CreateCategoryError> {

        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };
        if (name == "") { return #err(#EmptyName) };

        let new_slug = Utils.slugify(name);

        let result = categories.get(new_slug);
        switch (result) {
            case null {
                let category : Types.Category = {
                    name = name;
                    slug = new_slug;
                    category_img = cat_img;
                    featured = featured;
                    active = active;
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
        cat_img : Text,
        feaured : Bool,
        active : Bool,
    ) : async Result.Result<(Types.Category), Types.UpdateCategoryError> {
        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };

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
                    featured = feaured;
                    active = active;

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
        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };
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

    public shared (msg) func addtoCartItems(product_slug : Text, size : Text, color : Text, qty : Nat8) : async Result.Result<(Types.CartItem), Types.CreateCartItemsError> {

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
        size : Text,
        color : Text,
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

    public shared (msg) func clearallcartitmesbyprincipal() : async Result.Result<(), Types.DeleteCartItemsError> {
        //  if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        let caller = msg.caller;
        let filteredCartItems = HashMap.mapFilter<Types.CartId, Types.CartItem, Types.CartItem>(
            cartItems,
            Text.equal,
            Text.hash,
            func(k : Types.CartId, v : Types.CartItem) : ?Types.CartItem {
                if (v.principal == caller) {
                    return ?v;
                } else {
                    return null; // Exclude this item
                };
            },
        );
        for (item in filteredCartItems.entries()) {
            cartItems.delete(item.0);
        };
        return #ok(());
    };

    //  -----------------------------------   Orders_Functions --------------------------------------------------------------------------------------------

    public shared ({ caller }) func updateshippingamount(s : Types.ShippingAmount) : async Result.Result<(Types.ShippingAmount), Types.UpdateShippingAmountError> {
        let adminstatus = await isAdmin(caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };

        if (s.shipping_amount == 0.00) {
            return #err(#EmptyShippingAmount);
        };
        shippingamount := s;
        return #ok(s);
    };

    public shared query func getshippingamount() : async Types.ShippingAmount {
        return shippingamount;
    };

    public shared (msg) func createOrder(order : Types.NewOrder) : async Result.Result<Types.Order, Types.OrderError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };
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
                    shippingAmount = shippingamount;
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
        let userPrincipalStr = Principal.toText(msg.caller);
        // Check if the caller is an admin
        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
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
                    shippingAmount = shippingamount;
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
        let userPrincipalStr = Principal.toText(msg.caller);

        // Check if the caller is an admin
        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
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
                    shippingAmount = shippingamount;
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
        if (Principal.isAnonymous(msg.caller)) {
            return #err(#UserNotAuthenticated);
        };
        let userPrincipalStr = Principal.toText(msg.caller);

        // Check if the caller is an admin
        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
        };
        orders.delete(id);
        return #ok(());
    };

    public shared ({ caller }) func getpaymentstatus() : async Result.Result<Text, Types.GetPaymentStatusError> {
        let userPrincipalStr = Principal.toText(caller);
        let result = orders.get(userPrincipalStr);
        switch (result) {
            case null {
                return #err(#OrderNotFound);
            };
            case (?v) {
                return #ok(v.paymentStatus);
            };
        };
    };

    public shared ({ caller }) func updatePaymentstatus(id : Types.OrderId, paymentStatus : Text) : async Result.Result<(Types.Order), Types.UpdatepaymentStatusError> {
        if (Principal.isAnonymous(caller)) {
            return #err(#UserNotAuthenticated);
        };
        let userPrincipalStr = Principal.toText(caller);
        // Check if the caller is an admin
        let adminstatus = await isAdmin(caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
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
                    shippingAmount = shippingamount;
                    orderStatus = v.orderStatus;
                    paymentStatus = paymentStatus;
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

    //----------------------------------------------  Contact_Functions  --------------------------------------------------------------------------------//

    public shared (msg) func createContact(co : Types.UserContact) : async Result.Result<(Types.Contact), Types.CreateContactError> {

        if (co.name == "") { return #err(#EmptyName) };
        if (co.email == "") { return #err(#EmptyEmail) };
        if (co.message == "") { return #err(#EmptyMessage) };

        let contactId : Types.ContactId = UUID.toText(await g.new());

        let contact : Types.Contact = {
            id = contactId;
            name = co.name;
            email = co.email;
            contact_number = co.contact_number;
            message = co.message;
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
        if (Principal.isAnonymous(msg.caller)) {
            return #err(#UserNotAuthenticated);
        };
        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
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
                    contact_number = v.contact_number;
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
        let userPrincipalStr = Principal.toText(msg.caller);

        // Check if the caller is an admin
        let adminstatus = await isAdmin(msg.caller);
        if (adminstatus == false) {
            return #err(#UserNotAdmin); // We require the user to be admin
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
    //                             if () {
    //                             };
    //                             let reviewRating : Types.ReviewRatings = {
    //                                 product_slug = product_slug;
    //                                 review = review;
    //                                 rating = rating;
    //                                 created_by = userP;
    //                                 time_created = Time.now();
    //                                 time_updated = Time.now();
    //                             };
    //                             ratingandreviews.put(product_slug, );
    //                             return #ok(reviewRating);
    //                         };
    //                         case (?v) {
    //                             let reviewRating : Types.ReviewRatings = {
    //                                 product_slug = product_slug;
    //                                 review = review;
    //                                 created_by = userP;
    //                                 rating = rating;
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
    // -------------------------- Stablising functions to store data --------------------------------------------------------------

    // Stablising the data
    // Preupgrade function to store the data in stable variables
    system func preupgrade() {
        stableproducts := Iter.toArray(products.entries());
        stablecategories := Iter.toArray(categories.entries());
        stableorders := Iter.toArray(orders.entries());
        stableaddresstoorder := Iter.toArray(addressToOrder.entries());
        // stableimgOffset := Iter.toArray(imgOffset.entries());
        // stableimgSize := Iter.toArray(imgSize.entries());
        stablecontacts := Iter.toArray(contacts.entries());
        stableUsers := Iter.toArray(Users.entries());
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
        // stableimgOffset := [];
        // stableimgSize := [];
        contacts := Map.fromIter<Types.ContactId, Types.Contact>(
            stablecontacts.vals(),
            10,
            Text.equal,
            Text.hash,
        );

        Users := Map.fromIter<Principal, Types.User>(
            stableUsers.vals(),
            10,
            Principal.equal,
            Principal.hash,
        );
         
    };

    public shared ({ caller }) func getstatisticaldetailforadmin() : async Result.Result<(Types.StatisticalDetail), Types.GetStatisticalDetailError> {
        // let adminstatus = await isAdmin(caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

        let totalOrders = Iter.toArray(orders.entries()).size();
        let totalProducts = Iter.toArray(products.entries()).size();
        let totalCategories = Iter.toArray(categories.entries()).size();
        let totalUsers = Iter.toArray(usersaddresslist.entries()).size();
        let totalContacts = Iter.toArray(contacts.entries()).size();

        let statisticalDetail : Types.StatisticalDetail = {
            totalOrders = totalOrders;
            totalProducts = totalProducts;
            totalCategories = totalCategories;
            totalUsers = totalUsers;
            totalContacts = totalContacts;
        };
        return #ok(statisticalDetail);
    };
};
