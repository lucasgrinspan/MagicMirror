#!/bin/bash
COMMAND="DISPLAY=:0 ./startup.bash"

sudo apt-get --purge autoremove unclutter

# Remove display rotate
sed -i '/display_rotate=1/d' /boot/config.txt
sed -i '/display_rotate=3/d' /boot/config.txt

# Remove startup command from bashrc file
sed -i '/DISPLAY=:0 ./startup.bash/d' ~/.bashrc

# Delete files
rm -rf ~/MagicMirror