#!/bin/bash
npm install

SESSION=es-microservice

tmux -2 new-session -d -s $SESSION

tmux rename-window 'Editor'
tmux split-window -v
tmux resize-pane -D 15
tmux send-keys "npm run watch" C-m

tmux select-pane -t 1
#run vim in this split
tmux send-keys "nvim" C-m

tmux new-window
#run server in this window
tmux send-keys "export PORT=8000" C-m
tmux send-keys "nodemon ./server.js" C-m

tmux select-window -t 1

# Attach to session
tmux -2 attach-session -t $SESSION
