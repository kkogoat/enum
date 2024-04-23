# Enum - Media Cataloguing
![Stars](https://img.shields.io/github/stars/kkogoat/enum?logo=github&label=github%20stars&style=for-the-badge)
![Forks](https://img.shields.io/github/forks/kkogoat/enum?logo=github&label=github%20forks&style=for-the-badge)
[![DockerPulls](https://img.shields.io/docker/pulls/kkogoat/enum?logo=docker&style=for-the-badge)](https://registry.hub.docker.com/r/kkogoat/enum)
[![DockerStars](https://img.shields.io/docker/stars/kkogoat/enum?logo=docker&style=for-the-badge)](https://registry.hub.docker.com/r/kkogoat/enum)

[View on Github](https://github.com/kkogoat/enum) | [View on Dockerhub](https://registry.hub.docker.com/r/kkogoat/enum)
### Table of Contents
1. [Description](#description)
1. [Demo](#demo)
1. [Features](#features)
1. [Roadmap](#roadmap)
1. [Feature Developing](#feature-developing)
1. [Node.js Server](#nodejs-server)
1. [Docker Container](#docker-container)

## Description
A local web application for cataloguing consumed media. Features Image uploading, multiple users, list export/import, multi-device login, and more. The application also stores all data locally, including uploaded images.

## Demo
Website: [https://enum.usagi.cc](https://enum.usagi.cc)

NOTE: For demo purposes: Image uploading, password changing, signup, device list & logout, are disabled. There is also a maximum number of 10 entries.

WARNING: Be careful of hyperlinks, since the demoaccount can be accessed by anyone.

USERNAME: demoaccount <br> PASSWORD: demo12345

## Features
Tested on: Desktop Browser, iPad mini 6, iPhone 14 Pro Max
<details> 
<summary> Features </summary>
<ul>
<li> Login/Signup/Change Password of User accounts
<li> Dark/Light Theme Toggle
<li> Create/Read/Update/Delete media entries
<li> Cover Image Uploads & Viewing (images saved locally)
<li> Search
<li> List Entry Hyperlinks
<li> Alphabetical/Types/Status Filters
<li> Title, Rating, Progress Sorting
<li> Quick analytics for catalogued media
<li> Export/Import Catalogue data
<li> Multi-Device Login & Logout
</ul>
</details>

## Feature Developing
### Running dev server
NOTE: Please take a look at .env.example file

NOTE: Under the assumption that you have MySQL installed and configured correctly
1. Clone or download repository
2. Change into directory of project
3. Create ".env" configuration file in project directory
4. Run node commands
```bash
npm install
npm run dev
```

## Node.js Server
### To build and run a Node.js server of enum:
NOTE: Please take a look at .env.example file

NOTE: Under the assumption that you have MySQL installed and configured correctly
1. Clone or download repository
2. Change into directory of project
3. Create ".env" configuration file in project directory
4. Run node commands
```bash
npm ci                  # Clean installs node dependencies
npm run build           # Builds svelte-kit project with node adapter
npm run start           # Stards node.js server with .env configuration
```

## Docker Container

Typical Directory Structure for deploying container
```
service-folder
├── enum                    # cloned repository
├── covers                  # covers folder (created for docker-compose)
├── logs                    # logs folder   (created for docker-compose)
└── docker-compose.yaml     # created for running container
```

### To build a docker image of enum:
1. Clone or download repository
2. Change into directory of project
3. Run docker build command
```bash
git clone https://github.com/kkogoat/enum.git
cd enum
docker build -t <name>:<version> .
```

### To run the docker container:
NOTE: Please take a look at docker-compose.example.yaml

1. Create a "docker-compose.yaml" in your desired directory
2. Make the covers and logs folder
```bash
mkdir ./covers ./logs
```
3. Run docker-compose command
```bash
docker-compose up -d
```
4. Connect to your docker instance
