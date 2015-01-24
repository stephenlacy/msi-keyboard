#!/bin/bash

# A script to choose a random msi keyboard color file from the
# examples folder, and run it (on startup or ever x min, for example)

# Adding to crontab:
# type    sudo crontab -e
# add    */30 * * * * /!!full path!!/msi-keyboard/randomColor.sh
# Full path should be the full path to the script

# Full path for cron job
BASEDIR="/home/!!Full path!!/msi-keyboard"
COLORDIR="$BASEDIR/examples"
MODESDIR="$BASEDIR/exampleModes"

# Check of on battery. If yes, shut off keyboard
# This could also be used to turn on only "low" lights
if [ $(cat /sys/class/power_supply/ADP1/online) -eq 1 ]; then
	# Get random color file
	COLORFILE=$(ls $COLORDIR | sort -R | tail -1)

	#echo "$COLORFILE selected"
	$(/usr/local/bin/node $COLORDIR/$COLORFILE)
else
	#echo "Laptop unplugged... switching off keyboard"
	$(/usr/local/bin/node $MODESDIR/off.js)
fi
