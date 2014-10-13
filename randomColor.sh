#!/bin/bash

# A script to choose a random msi keyboard color file from the
# examples folder, and run it (on startup or ever x min, for example)

# Adding to crontab:
# type    sudo crontab -e
# add    */30 * * * * /!!full path!!/msi-keyboard/randomColor.sh
# Full path should be the full path to the script

# Full path for cron job
COLORDIR="/!!full path!!/msi-keyboard/examples"

# Get random color file
COLORFILE=`ls $COLORDIR | sort -R | tail -1`

echo "$COLORFILE selected"
nodejs $COLORDIR/$COLORFILE
