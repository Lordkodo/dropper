#!/bin/bash
# Deploy front on appengine
cd front
npm run build

gsutil cp -r build gs://dropper
gsutil cp -r app.yaml gs://dropper

gsutil rsync -r gs://dropper ./test-app
cd test-app
gcloud app deploy
