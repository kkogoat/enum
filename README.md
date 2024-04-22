## Node.js Server
### To build a Node.js server of enum:
NOTE: Please take a look at .env.example file

NOTE: Under the assumption that you have MySQL installed and configured correctly
1. Clone or download repository
2. Change into directory of project
3. Create ".env" configuration file in project directory
3. Run node commands
```bash
npm ci                  # Clean installs node dependencies
npm run build           # Builds svelte-kit project with node adapter
npm run start           # Starde node.js server with .env configuration
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
4. Connect to your docker instance in your web browser of choice
