# Todo-app
> Simple Todo app written in Go

<img width="800" alt="Screen Shot 2020-12-26 at 14 11 26" src="https://user-images.githubusercontent.com/10775915/103145877-53ac7b80-4784-11eb-90f2-4b0880345efd.png">

<img width="800" alt="Screen Shot 2020-12-26 at 14 15 43" src="https://user-images.githubusercontent.com/10775915/103145924-daf9ef00-4784-11eb-9e6f-58f06658604c.png">

## Contents
- [Architecture](#architecture)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Getting started](#getting-started)
- [Install](#install)
- [Build](#build)
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

## <a id="getting-started" style="color: black;">Getting started</a>
Before getting started, you need ```.env``` file at ```server/``` following the ```.env.template``` file located in ```server``` directory.

## <a id="install" style="color: black;">Install</a>
```$ go get ./src```

## <a id="build" style="color: black;">Build</a>
```$ go build ./src/main.go```

## <a id="run" style="color: black;">Run</a>
```$ go run ./src/main.go```

## Docker build
```$ sudo docker build -t todo .```

## Docker run
```$ sudo docker run -it -p 8000:8000 todo```
