#!/bin/bash
NODEVERSION=17.8.0

# This is why I can't have nice things
echo $PATH
#unalias which

# Check if nodenv is installed
which -s nodenv
if [ $? -ne 0 ]; then
    echo "nodenv wasn't found"
    echo "I think it's best that you install this manually"
    echo "if you are on a Mac and have hombrew install then run:"
    echo "brew install nodenv"
    echo "Other platforms try the appropriate package manager"
    exit 1
fi

# set $NODEVERSION to the local version
nodenv local $NODEVERSION
if [ $? -ne 0 ]; then
    echo "ok, setting the local node version to $NODEVERSION failled."
    echo "It's probably because $NODEVERSION isn't installed on your machine."
    echo "Are you cool with this script downloading and installing $NODEVERSION?"
    read -p "ok to install another node version? (Y/N): "  GFI
    if [ "$GFI" == "Y" ] || [ "$GFI" == "y" ]; then
        nodenv install $NODEVERSION
        nodenv local $NODEVERSION
        if [ $? -ne 0 ]; then
            echo "well, I tried, but nodenv was a jerk."
            exit 1
        fi
    else
        echo "ok, not installing $NODEVERSION"
        exit 1
    fi
fi

npm install
if [ $? -ne 0 ]; then
    echo "Why can't we have nice things?"
    exit 1
fi

echo -e "\n\nAdd your API key and domain name to test/config/config.json"
echo -e "Then you should be all set up. Run the tests with:"
echo -e "\nnpx wdio \n"

