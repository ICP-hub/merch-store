#!/usr/bin/env bash

# Number of users to remove
NUM_USERS=60000

# Remove user identities
seq $NUM_USERS | parallel -j100 dfx identity remove user{}

# Remove admin identity
dfx identity remove admin

echo "Cleanup complete."
