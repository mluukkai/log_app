#!/bin/bash

kubectl delete -f manifests
kubectl delete -f db
kubectl delete -f pong/manifests

echo "Kubernetes resources deleted"