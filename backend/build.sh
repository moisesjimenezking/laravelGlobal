#!/bin/bash
sudo chmod -R 777 .
sudo cp .env.example .env
sudo docker-compose up -d --b