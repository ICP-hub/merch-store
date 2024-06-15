#!/usr/bin/env bash
dfx stop
set -e
trap 'dfx stop' EXIT

# Start the local network and clean previous state
dfx start --background --clean

# Create identities
dfx identity new alice --disable-encryption || true
ALICE=$(dfx --identity alice identity get-principal)
dfx identity new bob --disable-encryption || true
BOB=$(dfx --identity bob identity get-principal)

# Deploy your canister
dfx deploy backend

echo "Environment setup complete."
