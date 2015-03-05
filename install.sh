#!/bin/bash

yellow='\e[0;33m'
green='\e[0;32m'
red='\e[0;31m'
endColor='\e[0m'
ERROR=0
function errorCheck {
if [ $? -eq 0 ]
then
  echo -e "${green}$1: success${endColor}"
else 
  ERROR=1;
  error $1
fi
}
function error {
  echo -e "${red}$1: ERROR${endColor}"
}

if [ -z `which node` ] ; then
  error "Node cannot be found. Please install node before using this script"
  return 1 2> /dev/null
  exit 1
fi
if [ -z `which npm` ] ; then
  error "npm cannot be found. Please install npm before using this script"
  return 1 2> /dev/null
  exit 1
fi
if [ -z `which virtualenv` ] ; then
  error "virtualenv cannot be found. Please install virtualenv before using this script"
  return 1 2> /dev/null
  exit 1
fi

echo "Activating virtualenv."
virtualenv venv;
source venv/bin/activate
errorCheck "Activate virtualenv"

echo "Installing pip dependencies"
pip install -r requirements.txt
errorCheck "pip install"

echo "Installing grunt, bower and package/bower.json dependencies."
mkdir -p 'app/public/'
mkdir -p 'app/public/lib'
npm install -g grunt;
npm install -g grunt-cli;
npm install;
bower install;
errorCheck "install client/dev deps"
echo "Running grunt task."
grunt;
errorCheck "grunt build"

if [[ $ERROR == 0 ]];
then
  echo -e "${green}Install completed without errors.${endColor}"
else
  echo -e "${yellow}Install completed with errors.${endColor}"
fi
