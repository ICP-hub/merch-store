#!/usr/bin/env bash

# Identity for the admin
ADMIN_IDENTITY="admin"
PRODUCT_SLUGS_FILE="product_slugs.txt"

# Number of categories and products to create
NUM_CATEGORIES=10
NUM_PRODUCTS=10

# Ensure NUM_CATEGORIES is not zero
if [ $NUM_CATEGORIES -eq 0 ]; then
  echo "Error: NUM_CATEGORIES is zero. Set a non-zero value for NUM_CATEGORIES."
  exit 1
fi

# Export NUM_CATEGORIES to environment
export NUM_CATEGORIES

# Local variable to hold the first category slug
CATEGORY_SLUG="category1"

# Function to create a category
create_category() {
  local category_index=$1
  local category_name="Category${category_index}"
  local category_img="http://example.com/category${category_index}.png"
  local call="dfx canister call backend createCategory \"(\\\"$category_name\\\", \\\"$category_img\\\", true, true)\""
  echo "Calling createCategory with: $call"
  result=$(eval $call)

  if [[ $result == *"record"* ]]; then
    echo "Category ${category_name} created with slug ${slug}"
  else
    echo "Failed to create category ${category_name}"
    echo $result
  fi
}

# Function to create a product
# Function to create a product
create_product() {
  local product_index=$1
  local product_title="Product${product_index}"
  local product_description="Description for Product${product_index}"
  local product_active=true
  local product_newArrival=false
  local product_trending=false

  # Constructing UserProduct
  local user_product="record {
    title = \\\"$product_title\\\";
    description = \\\"$product_description\\\";
    category = \\\"category1\\\";
    active = $product_active;
    newArrival = $product_newArrival;
    trending = $product_trending;
  }"

  # Constructing VariantSize array
  local variant_sizes="vec {
    record { size = \\\"S\\\" };
    record { size = \\\"M\\\" };
    record { size = \\\"L\\\" };
  }"

  # Constructing VariantColor array
  local variant_colors="vec {
    record { color = \\\"Red\\\"; img1 = \\\"http://example.com/red1.png\\\"; img2 = \\\"http://example.com/red2.png\\\"; img3 = \\\"http://example.com/red3.png\\\"; variant_price = 29.99; variant_sale_price = 19.99; inventory = 100 };
    record { color = \\\"Blue\\\"; img1 = \\\"http://example.com/blue1.png\\\"; img2 = \\\"http://example.com/blue2.png\\\"; img3 = \\\"http://example.com/blue3.png\\\"; variant_price = 29.99; variant_sale_price = 19.99; inventory = 100 };
  }"

  local call="dfx canister call backend createProduct \"($user_product, $variant_sizes, $variant_colors)\""
  echo "Calling createProduct with: $call"
  result=$(eval $call)

  echo "Result of createProduct for Product $product_index:"
  echo $result
}

# Export the functions to make them available to parallel
export -f create_category
export -f create_product

# Ensure the product slugs file is empty
> $PRODUCT_SLUGS_FILE

# Measure the time taken to create categories
start_time_categories=$(date +%s)
seq $NUM_CATEGORIES | parallel -j1 create_category
end_time_categories=$(date +%s)

# Measure the time taken to create products
start_time_products=$(date +%s)
seq $NUM_PRODUCTS | parallel -j10 create_product
end_time_products=$(date +%s)

# Calculate elapsed time
time_categories=$((end_time_categories - start_time_categories))
time_products=$((end_time_products - start_time_products))

echo "Admin functions complete."
echo "Time taken for creating categories: $time_categories seconds"
echo "Time taken for creating products: $time_products seconds"