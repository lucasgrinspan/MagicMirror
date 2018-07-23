#!/bin/bash
echo "Installing unclutter (hides the mouse)"
apt-get install unclutter

echo "Installing startup script"
mv startup.sh  /home/pi/
echo "Modifying .bashrc file"
echo "DISPLAY=:0 ./startup.sh" >> /home/pi/.bashrc

orientation="a"
while [[ ${orientation^^} != "L" && ${orientation^^} != "R" && ${orientation^^} != "O" ]]; do
    echo "Is your screen rotated to the left, right, or in the original orientation? [l/r/o]"
    read orientation
done
if [[ ${orientation^^} == "L" ]]
then
    sed -i "4i display_rotate=1" /boot/config.txt
elif [[ ${orientation^^} == "R" ]]
then
    sed -i "4i display_rotate=3" /boot/config.txt
fi
echo "Screen orientation set"

echo "All changes have been made and a reboot is necessary to complete the process"
echo "The mirror display will automatically open after the reboot."
read -p "Would you like to reboot now? [y/n]: " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1
reboot now
