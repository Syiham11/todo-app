package services

import (
	"gorm.io/gorm"
	"gorm.io/driver/mysql"
	"github.com/juseongkr/todo-app/server/src/models"
)

type DBLayer interface {
	AddUser(models.User) error
	AddTodo(models.Todo) error
	GetAllTodos() ([]models.Todo, error)
}

type DBORM struct {
	*gorm.DB
}

func NewORM(url string) (*DBORM, error) {
	db, err := gorm.Open(mysql.Open(url + "/todo?charset=utf8mb4&parseTime=True"), &gorm.Config{})

	return &DBORM{DB: db}, err
}

