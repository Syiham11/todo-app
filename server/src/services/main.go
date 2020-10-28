package services

import (
	"github.com/juseongkr/todo-app/server/src/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type DBLayer interface {
	CreateUser(models.User) error
	SignInUser(models.User) error

	AddTodo(models.Todo, string) error
	GetAllTodos() ([]models.TodoDto, error)
	GetTodoByID(int) (models.TodoDto, error)
}

type DBORM struct {
	*gorm.DB
}

func NewORM(url string) (*DBORM, error) {
	db, err := gorm.Open(mysql.Open(url+"/todo?charset=utf8mb4&parseTime=True"), &gorm.Config{})

	return &DBORM{DB: db}, err
}
