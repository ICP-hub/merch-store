/* ----------------------------------------------------------------------------------------------------- */
/*  @ Cart utilities : <ShippingAddressPage /> : <CheckoutPage />
/* ----------------------------------------------------------------------------------------------------- */
// Function to filter product list based on cart items
// export const filterProductList = (productList, cartItems) => {
//   return productList?.filter((productEntry) => {
//     const productSlug = productEntry[0];
//     const matchingCartItem = cartItems.find(
//       (cartItem) => cartItem[1].product_slug === productSlug
//     );

//     return matchingCartItem !== undefined;
//   });
// };

// // Function to find matching details for a cart item
// export const findMatchingDetails = (cartItem, filteredProductList) => {
//   const [orderId, { color, size, product_slug }] = cartItem;
//   const matchingProduct = filteredProductList?.find(
//     ([prodSlug]) => prodSlug === product_slug
//   );

//   // Find the variant details based on color
//   if (matchingProduct) {
//     const [, productDetails] = matchingProduct;
//     const matchingVariant = productDetails.variantColor.find(
//       (variant) => variant.color === color
//     );

//     if (matchingVariant) {
//       // If a matching variant found, return obj: product, orderId, size, color, variantPrice
//       return {
//         product: productDetails,
//         orderId,
//         size,
//         color,
//         variantPrice: matchingVariant.variant_price,
//       };
//     }
//   }

//   // Return null if no match
//   return null;
// };

// // Function to get cart item details
// export const getCartItemDetails = (cartItems, filteredProductList) => {
//   return cartItems
//     .map((cartItem) => findMatchingDetails(cartItem, filteredProductList))
//     .filter(Boolean);
// };

// Refactoring code from above :
export const getCartItemDetails = (cartItems, productList) => {
  // console.log(cartItems, productList);
  return cartItems
    ?.map(([orderId, { color, size, product_slug, quantity }]) => {
      const matchingProduct = productList?.find(
        ([prodSlug]) => prodSlug === product_slug
      );

      if (matchingProduct) {
        const [, productDetails] = matchingProduct;

        // Check if variantColor exists and has length
        if (
          productDetails.variantColor &&
          productDetails.variantColor.length > 0
        ) {
          const matchingVariant = productDetails.variantColor.find(
            (variant) => variant.color === color
          );
          if (matchingVariant) {
            // If matching variant: return obj: product, orderId, size, color, variantPrice, variantSellPrice, variantSellPriceBasedOnQty
            return {
              product: productDetails,
              orderId,
              quantity,
              size,
              color,
              img1: matchingVariant.img1,
              // Use 0 as default
              variantPrice: matchingVariant.variant_price || 0,
              variantSellPrice: matchingVariant.variant_sale_price || 0,
              variantSellPriceBasedOnQty:
                (matchingVariant.variant_sale_price || 0) * quantity,
              variantPriceBasedOnQty:
                (matchingVariant.variant_price || 0) * quantity,
            };
          }
        }

        // // If there is no matching variant, return obj with basic details using sellingPrice and price
        // return {
        //   product: productDetails,
        //   orderId,
        //   quantity,
        //   size: null, // No size : null ? or default? fix later
        //   color: null, // No color : null ? or default? fix late
        //   variantPrice: productDetails.price || 0, // Price : default 0
        //   variantSellPrice: productDetails.sellingPrice || 0, // sellingPrice : default : 0
        //   variantSellPriceBasedOnQty:
        //     (productDetails.sellingPrice || 0) * quantity,
        //   variantPriceBasedOnQty: (productDetails.price || 0) * quantity,
        // };
      }
      return null;
    })
    .filter(Boolean);
};

// Sum the variantSellPrice
export const totalCartSellPrice = (cartItemDetails) =>
  cartItemDetails?.reduce((acc, cartItem) => {
    return acc + cartItem.variantSellPriceBasedOnQty;
  }, 0);

// Sum the variantPrice
export const totalCartVariantPrice = (cartItemDetails) =>
  cartItemDetails?.reduce((acc, cartItem) => {
    return acc + cartItem.variantPriceBasedOnQty;
  }, 0);
