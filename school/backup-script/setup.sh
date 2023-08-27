#!/bin/bash
# backup setup script

#TODO: implement safety checks for directory

# sets key $1 with value $2 in config file
storeToConfig() {
  sed -i '' "s/\(${1} *= *\).*/\1${2//\//\\/}/" backup.config
}

# store value $1 to target config file
storeToTargets() {
  echo "${1}" >>targets.config
}

# store to crontab function
storeToCrontab() {
  crontab -l | {
    cat echo "${1}"
  } | crontab -
}

# check if backup file exists
if [[ -s "backup.config" ]]; then
  source "backup.config"
else
  echo "fatal: no config file found"
  exit 1
fi

# check if targets file exists
if [[ -s "targets.config" ]]; then
  echo "fatal: no targets file found"
  exit 1
fi

# welcome message
echo "\n Welcome to the backup setup \n"

# get and save directory for backups
echo "Please enter the directory where u want to store your compressed backups"
read -p "prompt: enter backup directory: " backupDirectory
storeToConfig "backupDirectory" ${backupDirectory}

echo "Please enter the directory u want to backup"

while [[ ! ${doneAddingTargets} =~ ^[Nn]$ ]]; do
  read -p "prompt: enter directory to backup: " targetDirectory

  echo "info: writing to targets..."
  storeToTargets ${targetDirectory}

  read -p "prompt: do u want to add another one? (Y/n): " doneAddingTargets
done

# Ask for cronjob setup
read -p "prompt: would you like to run your backups automatically daily with a cronjob? (Y/n): " cronjobAnswer

# Check for answer
if [[ $cronjobAnswer =~ ^[Yy]$ ]]; then
  echo "info: set scripts directory"
  # store directory of scripts
  scriptsDirectory=$(pwd)
  echo "info: write daily backup to crontab"
  To "0 0 * * * cd ${scriptsDirectory} && ./backup.sh"
fi
