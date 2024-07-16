#!/usr/bin/env bash

# Number of users to create
NUM_USERS=10

get_cartitems() {
  local user_index=$1
  dfx --identity user${user_index} canister call backend getCallerCartItems(10,0)
}