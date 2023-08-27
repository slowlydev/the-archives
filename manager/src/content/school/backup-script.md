---
title: Backup Shell Script
description: Shell scripts that help you backup your data

creationDate: 05-23-2022
archivalDate: 08-26-2023

technologies:
  - bash
---

This project contains three scripts

### setup.sh

In setup you select the folders you want to backup, this will be saved in a config file.

### backup.sh

The backup script creates a tar archive of the folder and stores it.

### restore.sh

The restore script lets you choose a created backup and lets you restore it.
