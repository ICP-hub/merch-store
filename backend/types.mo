// types.mo
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
module {
    public type ProductId = Nat;
    // Slug is a unique identifier for a product
    public type SlugId = Text;
    public type WishlistId = Text;
    public type CartId = Text;
    public type RId = Text;

    public type User = {
        id : Principal;
        FirstName : Text;
        LastName : Text;
        email : Text;
    };

    public type CreateUserError = {
        #UserAlreadyExists;
        #EmptyEmail;
        #EmptyFirstName;
        #EmptyLastName;
    };

    public type UpdateUserError = {
        #UserNotAuthenticated;
        #UserNotFound;
        #EmptyEmail;
        #EmptyFirstName;
        #EmptyLastName;
    };

    public type GetUserError = {
        #UserNotFound;
    };

    public type CreateProductError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyTitle;
    };

    public type GetProductError = {
        #ProductNotFound;
    };

    public type UpdateProductError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyTitle;
        #ProductNotFound;
    };

    public type DeleteProductError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
    };

    public type CreateCategoryError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyName;
        #CategoryAlreadyExists;
    };

    public type UpdateCategoryError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyName;
        #CategoryNotFound;
    };

    public type DeleteCategoryError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
    };

    public type GetCategoryError = {
        #CategoryNotFound;
    };

    public type CreateReviewError = {
        #EmptyProduct_slug;
        #UserNotAuthenticated;
        #EmptyReview;
        #ProductNotFound;
        #EmptyProduct;
        #EmptyRating;

    };
    // TODO: payments error is what we will be deailing with here so implement that

    public type Rating = {
        #onestar;
        #twostar;
        #threestar;
        #fourstar;
        #fivestar;
    };

    public type ReviewRatings = {
        product_slug : SlugId;
        rating : Rating;
        review : Text;
        created_by : Principal;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type OrderError = {
        #MissingData;
        #PaymentAddressAlreadyUsed;
        #UnableToCreate;
        #OrderNotFound;
        #UnableToUpdate;
    };

    public type Category = {
        name : Text;
        slug : SlugId;
        category_img : ImgId;
    };

    // User input data for products
    public type UserProduct = {
        title : Text;
        price : Float;
        inventory : Nat;
        description : Text;
        category : SlugId;
        active : Bool;
        newArrival : Bool;
        trending : Bool;
    };

    // Backend data for products
    public type Product = UserProduct and {
        img : ImgId; // Upload 3 images for each product
        id : ProductId;
        slug : SlugId;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type ImgId = Text;
    public type OrderId = Text;
    public type OrderProduct = {
        id : ProductId;
        quantity : Nat8;
    };

    public type ShippingAddress = {
        mail : Text;
        firstName : Text;
        lastName : Text;
        street : Text;
        city : Text;
        postCode : Text;
        country : Text;
        county : Text;
    };
    // TODO: show the price in the order a argument
    public type NewOrder = {
        shippingAddress : ShippingAddress;
        products : [OrderProduct];
        paymentAddress : Text;
        userid : Principal;
        totalAmount : Float;
        subTotalAmount : Float;
        shippingAmount : Float;
        paymentMethod : Text;
        orderStatus : Text;
        paymentStatus : Text;
        awb : Text;
    };

    public type Order = NewOrder and {
        id : OrderId;
        timeCreated : Time.Time;
        timeUpdated : Time.Time;
    };

    public type OrderStatus = {
        #UserConfirmedPayment;
        #TransactionIdSet;
        #Verified;
    };

    public type UpdateOrderError = {
        #OrderNotFound;
        #UserNotAuthenticated;
        #UserNotAdmin;
    };

    public type HeaderField = (Text, Text);

    public type StreamingStrategy = {
        #Callback : {
            callback : StreamingCallback;
            token : StreamingCallbackToken;
        };
    };

    public type StreamingCallback = query (StreamingCallbackToken) -> async (StreamingCallbackResponse);

    public type StreamingCallbackToken = {
        content_encoding : Text;
        index : Nat;
        key : Text;
    };

    public type StreamingCallbackResponse = {
        body : Blob;
        token : ?StreamingCallbackToken;
    };

    public type Request = {
        body : Blob;
        headers : [HeaderField];
        method : Text;
        url : Text;
    };

    public type Response = {
        body : Blob;
        headers : [HeaderField];
        streaming_strategy : ?StreamingStrategy;
        // ata.status_code : Nat16;
    };

    public type PanelInfo = {
        ordersCount : Nat;
        // totalRevenue : BitcoinApiTypes.Satoshi;
        // accountBalance : BitcoinApiTypes.Satoshi;
    };

    public type Size = {
        title : Text;
        slug : SlugId;
        short : Text;
    };

    public type Color = {
        title : Text;
        slug : SlugId;
        color : Text;
    };
    // Cart Items

    public type CartItem = {
        id : CartId;
        product_slug : Text;
        size : Size;
        color : Color;
        quantity : Nat8;
        principal : Principal;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type CreateCartItemsError = {
        #UserNotAuthenticated;
        #EmptyColor;
        #EmptySize;
        #EmptyProductSlug;
        #ProductSlugAlreadyExists;
        #UserNotAdmin;
    };

    public type GetCartItemsError = {
        #CartItemNotFound;
    };

    public type UpdateCartItemsError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #CartItemNotFound;
    };

    public type DeleteCartItemsError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
    };

    // WishList
    public type CreateWishlistItemError = {
        #UserNotAuthenticated;
        #EmptyProductSlug;
        #WishlistItemAlreadyExists;
        #UserNotAdmin;
    };

    public type GetWishlistItemError = {
        #WishlistItemNotFound;
    };

    public type UpdateWishlistItemError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #WishlistItemNotFound;
    };

    public type DeleteWishlistItemError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
    };

    public type WishlistItem = {
        id : WishlistId;
        product_slug : Text;
        principal : Principal;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    // Order

    public type DeleteOrderError = {
        #OrderNotFound;
        #UserNotAuthenticated;
        #UserNotAdmin;
    };

    // Contact US (Deatils of the user who wants to contact us)

    public type ContactId = Text;

    public type UserContact = {
        name : Text;
        email : Text;
        message : Text;
        read : Bool;
    };

    public type Contact = UserContact and {
        id : ContactId;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type CreateContactError = {
        #EmptyName;
        #EmptyEmail;
        #EmptyMessage;
    };

    public type GetContactError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #ContactNotFound;
    };

    public type DeleteContactError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
    };

    public type UpdateContactError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyName;
        #EmptyEmail;
        #EmptyMessage;
        #ContactNotFound;
    };

};
