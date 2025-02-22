#!/bin/bash

CERT_DIR="./certificates"
CERT_FILE="$CERT_DIR/cert.pem"
KEY_FILE="$CERT_DIR/key.pem"

if [ ! -f "$CERT_FILE" ] || [ ! -f "$KEY_FILE" ]; then
    echo "Generating SSL Certificates..."
    openssl req -x509 -newkey rsa:2048 -keyout "$KEY_FILE" -out "$CERT_FILE" -days 365 -nodes -subj "/CN=localhost"
    echo "Certificates generated in "$CERT_DIR""
else
    echo "Certificates already existent in "$CERT_DIR""
fi