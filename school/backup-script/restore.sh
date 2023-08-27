#!/bin/bash
# backup restore script

# check for backup file
if [[ -s "backup.config" ]]; then
  source "backup.config"
else
  echo "fatal: no config file found"
  exit 1
fi

# check if target directory exists
if [[ ! -d "${backupDirectory}" ]]; then
  echo "fatal: backup directory does not exists"
  exit 1
fi

# log data
echo "info: backup directory ${backupDirectory}"
echo "info: timestamp format ${timestampFormat}"

# getting all backups available from backup directory
backups=($(ls ${backupDirectory}))

# ask for backup to restore
PS3="$(date +"%H:%M:%S") prompt: what backup do u want to restore? "
select selectedBackup in "${backups[@]}"; do
  echo "info: you selected: ${selectedBackup}"
  break
done

# ask for confirmation to restore
read -p "prompt: do u want to start the restore process (no point of return from here) y/n: " readConfirmation
if [[ ${readConfirmation} =~ ^[Yy]$ ]]; then
  pwd=$(pwd)
  cd ${backupDirectory}

  if [[ ! -s "${selectedBackup}" ]]; then
    echo "fatal: backup not found"
    exit 1
  fi

  nice -n 19 tar -xf ${selectedBackup}

  cd backup

  cat "targets.info" | while read line; do
    keyWithPath=(${line//=/ })

    if [[ ! -d "${keyWithPath[1]}" ]]; then
      mkdir -p "${keyWithPath[1]}"
    fi

    nice -n 16 cp -r "${keyWithPath[0]}/"* "${keyWithPath[1]}"
  done

  cd ..

  rm -r backup

  cd ${pwd}

  echo "info: successfully restored your selected backup"
  exit 0
else
  echo "info: you declined the transfer. enjoy ur current data"
  exit 1
fi
