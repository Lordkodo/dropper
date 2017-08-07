#! /bin/bash

# Clean previous version
rm -rf dropper

# Download latest version
git clone https://github.com/lordkodo/dropper.git

# Run it !
cd dropper/backend
python3.5 manage.py runserver 0.0.0:8000
