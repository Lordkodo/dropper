# On dropper/front
npm run build
gsutil cp -r build/ gs://lordkodo-dropper/front/
gsutil cp -r app.yaml gs://lordkodo-dropper/front/

# On GCP Console
gsutil rsync -r gs://lordkodo-dropper/front/ ./dropper-app/
cd dropper-app
gcloud app deploy
