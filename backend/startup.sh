#! /bin/bash

rm -rf dropper
git clone https://github.com/lordkodo/dropper.git
cd dropper/backend
python3.5 manage.py runserver 0.0.0:8000
