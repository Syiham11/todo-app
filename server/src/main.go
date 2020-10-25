package main

import (
	"github.com/joho/godotenv"
	"github.com/juseongkr/todo-app/server/src/app"
	"log"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	log.Fatal(app.RunServer())
}
