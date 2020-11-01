# Todo-app

## Contents
- [Architecture](#architecture)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Getting stared](#getting-started)
- [Build](#build)
- [Test](#test)
  - [Frontend](#test-frontend)
  - [Backend](#test-backend)
- [Run](#run)

## <a id="architecture" style="color: black;">Architecture</a>

### <a id="frontend" style="color: black;">Frontend</a>
This is the directory structure for ```frontend```, it is created by ```create-react-app``` with ```--template typescript``` flag, which helps us to create react project.
```
client
├── build
├── public
├── src
│   ├── components
│   ├── state
│   ├── constants.ts
│   ├── index.tsx
│   └── types.ts
├── package.json
└── tsconfig.json
```

### <a id="backend" style="color: black;">Backend</a>
```backend``` directory structure is as follows, and the necessary information is contained in each folder.
```
server
├── build
├── src
│   ├── app
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── services
│   └── main.go
└── Dockerfile
```

## <a id="getting-started" style="color: black;">Getting stared</a>
Before getting started, you need ```.env``` file at ```server/``` following the ```.env.template``` file located in ```server``` directory.

## Install
```$ go get ./src```

## Build
```$ go build ./src/main.go```

## Run
```$ go run ./src/main.go```

## Docker build
```$ sudo docker build -t todo .```

## Docker run
```$ sudo docker run -it -p 8000:8000 todo```
