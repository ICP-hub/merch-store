#!/usr/bin/env bash

# Number of users to create
NUM_USERS=10

# Read the first product slug from the product_slugs file
# PRODUCT_SLUG=$(head -n 1 $PRODUCT_SLUGS_FILE)

# Function to create a user identity and update details
create_user() {
  local user_index=$1
  local email="user${user_index}@example.com"
  local firstName="First${user_index}"
  local lastName="Last${user_index}"

  # Create new identity
  dfx identity new user${user_index} --storage-mode=plaintext || true
    
  # Call the canister function to update user details
  dfx --identity user${user_index} canister call backend updateUser "(\"$email\", \"$firstName\", \"$lastName\")"
}

get_cartitems() {
  local user_index=$1
  dfx --identity user${user_index} canister call backend getCallerCartItems(10,0)
}

# Function to get user details
# get_user_details() {
#   local user_index=$1
#   dfx --identity user${user_index} canister call backend getUserdetailsbycaller
# }

# # Function to create address detail
# create_address() {
#   local user_index=$1
#   local email="user${user_index}@example.com"
#   local firstName="First${user_index}"
#   local lastName="Last${user_index}"

#   dfx --identity user${user_index} canister call backend createAddress "(record {firstname = \"$firstName\"; country = \"Country${user_index}\"; city = \"City${user_index}\"; email = \"$email\"; state = \"State${user_index}\"; address_type = \"Home\"; phone_number = \"1234567890\"; pincode = \"123456\"; lastname = \"$lastName\"; addressline1 = \"Address Line 1\"; addressline2 = \"Address Line 2\"})"
# }

# # Function to place an order
# place_order() {
#   local user_index=$1
#   local shippingAddress="record {
#     firstname = \"First${user_index}\";
#     country = \"Country${user_index}\";
#     city = \"City${user_index}\";
#     email = \"user${user_index}@example.com\";
#     state = \"State${user_index}\";
#     address_type = \"Home\";
#     phone_number = \"1234567890\";
#     pincode = \"123456\";
#     lastname = \"Last${user_index}\";
#     addressline1 = \"Address Line 1\";
#     addressline2 = \"Address Line 2\";
#   }"

#   local products="vec {
#     record {
#       id = \"1\";
#       quantity = 1;
#       title = \"Product1\";
#       img = \"http://example.com/product1.png\";
#       quantity = Nat8;
#       size = \"M\";
#       color = \"Red\";
#       sale_price = 19.99;
#     }
#   }"

#   local totalAmount=29.99
#   local subTotalAmount=24.00
#   local shippingAmount= "record {
#     shipping_amount = 5.00 ;
#   }"
#   local orderStatus="New"
#   local paymentStatus= "complete"
#   local paymentAddress="PaymentAddress${user_index}"
#   local paymentMethod="CreditCard"
#   local awb="AWB123${user_index}"

#   dfx --identity user${user_index} canister call backend createOrder "(record {
#     shippingAddress = $shippingAddress;
#     products = $products;
#     totalAmount = $totalAmount;
#     subTotalAmount = $subTotalAmount;
#     shippingAmount = $shippingAmount;
#     orderStatus = /"completed/";
#     paymentStatus = /"complete/";
#     paymentAddress = $paymentAddress;
#     paymentMethod = $paymentMethod;
#     awb = $awb;
#   })"
# }

# Function to delete a user identity
delete_user() {
  local user_index=$1
  dfx identity remove user${user_index}
}

# Export the functions to make them available to parallel
export -f create_user
# export -f get_user_details
# export -f create_address
# export -f place_order
export -f delete_user

# Measure the time taken to create users
start_time_create=$(date +%s)
seq $NUM_USERS | parallel -j10 create_user
end_time_create=$(date +%s)

# Measure the time taken to get user details
# start_time_get=$(date +%s)
# seq $NUM_USERS | parallel -j10 get_user_details
# end_time_get=$(date +%s) 
