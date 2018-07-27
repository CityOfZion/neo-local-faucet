#!/bin/bash
# Script that Travis CI will run to test the project, it is conditional on the branch.

REPO=cityofzion/neo-local-faucet

set -e

if [[ $TRAVIS_BRANCH == 'master' ]]
then
  docker login -u $DOCKER_USER -p $DOCKER_PASS
  docker build -f Dockerfile -t $REPO:latest .
  docker tag $REPO:latest $REPO:$TRAVIS_TAG
  docker push $REPO
fi
