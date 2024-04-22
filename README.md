# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building
To build a docker image of enum:
```bash
git clone https://github.com/kkogoat/enum.git
cd enum
docker build -t <name>:<version> .
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
```bash
git clone https://github.com/kkogoat/enum.git
cd enum
docker build -t <name>:<version> .
```

### To run the docker container:
NOTE: Please take a look at docker-compose.example.yaml

1. Create a docker-compose.yaml in your desired directory
2. Make the covers and logs folder
```bash
mkdir ./covers ./logs
```
3. Run docker-compose command
```bash
docker-compose up -d
```
4. Connect to your docker instance in your web browser of choice
