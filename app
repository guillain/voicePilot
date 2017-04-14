#!/bin/bash
# @file Main programme - VoicePilot
# @author guillain (guillain@gmail.com)
# @license GPL-3.0

APP='voicepilot.js'
APP_DIR='/var/www/voicePilot'
LOG_DIR="${APP_DIR}/log"

# For the manual mode and the tunneling
# ngrok http 8081
# lt -s mytest -p 8081

cd "${APP_DIR}"

case $1 in
  start)
    pm2 start "${APP}" \
    --log    "${LOG_DIR}/all.log" \
    --output "${LOG_DIR}/app.log" \
    --error  "${LOG_DIR}/err.log" \
    --merge-logs \
    --log-date-format="YYYY-MM-DD HH:mm Z"
  ;;
  stop)
    pm2 stop "${APP}";;
  restart)
    $0 stop
    $0 start
    ;;
  show)
    pm2 show "${APP}";;
  status)
    pm2 status "${APP}";;
  log)
    pm2 log "${APP}";;
  manual)
    DEBUG=* node "${APP}";;
  *) echo "command not found";;
esac

