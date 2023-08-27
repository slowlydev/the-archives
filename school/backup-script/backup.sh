#!/bin/bash
# backup script

# check if backup config file exists
if [[ -s "backup.config" ]]; then
  source "backup.config"
else
  echo "fatal: no config file found"
  exit 1
fi

# check if targets file exists
if [[ ! -s "targets.config" ]]; then
  echo "fatal: no targets file found"
  exit 1
fi

# check if backup directory exists
if [[ ! -d "${backupDirectory}" ]]; then
  echo "fatal: backup directory does not exists"
  exit 1
fi

# make dir for shadow copies
mkdir /tmp/backup

# progress info
echo "info: backing up..."

cat "targets.config" | while read line; do

  # remove double quotes
  tempTargetDirectory=$(sed -e 's/^"//' -e 's/"$//' <<<"$line")
  # remove single quotes
  targetDirectory=$(sed -e "s/^'//" -e "s/'$//" <<<"$tempTargetDirectory")

  # get name of target directory
  targetDirectoryName=$(echo "${targetDirectory}" | sed 's:.*/::')

  # check if target directory is empty
  if [[ -z "$(ls -A ${targetDirectory})" ]]; then
    echo "error: refuse to backup directory which is empty"
    exit 1
  fi

  echo "info: backing up directory: ${targetDirectory} ${targetDirectoryName}"

  # make shadow copy of target directory in temp/backup folder
  nice -n 19 cp -r "${targetDirectory}" "/tmp/backup/"

  # check if targets info file exists in temp/backup folder
  if [[ ! -s "/tmp/backup/targets.info" ]]; then
    echo "info: no targets info file found, creating a new one"
    touch "/tmp/backup/targets.info"
  fi

  # add name of directory with path to temp/backup
  echo "${targetDirectoryName}=${targetDirectory}" >>"/tmp/backup/targets.info"

done

# remember current directory
pwd=$(pwd)
cd /tmp/

# compress
echo "info: compressing..."

nice -n 19 tar -czf "backup.tar.gz" "backup"

echo "info: done compressing"

nice -n 19 rm -r "backup"
nice -n 19 mv "backup.tar.gz" "${timestampFormat}-backup.tar.gz"
nice -n 19 mv "${timestampFormat}-backup.tar.gz" "${backupDirectory}"

# finish info
echo "info: backup successful"

# get back to were we were
cd "${pwd}"
