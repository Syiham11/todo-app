package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/juseongkr/todo-app/server/src/services"
)

type HandlerInterface interface {
	AddUser(c *gin.Context)
	AddTodo(c *gin.Context)
	GetTodos(c *gin.Context)
}

type Handler struct {
	db services.DBLayer
}

func NewHandler(url string) (*Handler, error) {
	database, err := services.NewORM(url)
	if err != nil {
		return nil, err
	}

	return &Handler{db: database}, nil
}

