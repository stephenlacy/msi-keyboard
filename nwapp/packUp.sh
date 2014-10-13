#!/bin/bash

# A helper script to zip up the application directory "app"

# Move into the application directory
cd app
# Zip up the entire structure and save it one level up
zip -r ../test_app.nw *

# Make a standalone app
# cat nw ./test_app.nw > standalone.app
