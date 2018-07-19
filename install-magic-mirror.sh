#!/bin/bash
echo "Installing unclutter (hides the mouse)"
apt-get install unclutter

echo "Installing startup script"
mv startup.bash ~
echo "Modifying .bashrc file"
COMMAND="DISPLAY=:0 ./startup.bash"
echo $COMMAND >> ~/.bashrc

orientation="a"
while [[ ${orientation^^} != "L" && ${orientation^^} != "R" && ${orientation^^} != "O" ]]; do
    echo "Is your screen rotated to the left, right, or in the original orientation? [l/r/o]"
    read orientation
done
if [[ ${orientation^^} == "L" ]]
then
    echo "display_rotate=1" >> /boot/config.txt
elif [[ ${orientation^^} == "R" ]]
then
    echo "diplay_rotate=3" >> /boot/config.txt
fi
echo "Screen orientation set"

echo "All changes have been made and a reboot is necessary to complete the process"
read -p "Would you like to reboot now? [y/n]: " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1
reboot now