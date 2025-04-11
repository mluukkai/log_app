#!/bin/bash

kubectl apply -f manifests
kubectl apply -f db
kubectl apply -f pong/manifests

echo "Kubernetes resources applied successfully."