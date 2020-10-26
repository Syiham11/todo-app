package services

import (
	"github.com/juseongkr/todo-app/server/src/models"
)

func (db *DBORM) AddTodo(todo models.Todo) error {
	return db.Create(&todo).Error
}

func (db *DBORM) GetAllTodos() (todos []models.Todo, err error) {
	return todos, db.Find(&todos).Error
}