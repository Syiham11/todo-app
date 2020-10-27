package services

import (
	"github.com/juseongkr/todo-app/server/src/models"
)

func (db *DBORM) AddTodo(todo models.Todo, username string) error {
	var id int
	err := db.Select("id").First(&models.User{}, "username = ?", username).Scan(&id).Error
	if err != nil {
		return err
	}

	todo.Uploader = id
	return db.Create(&todo).Error
}

func (db *DBORM) GetAllTodos() (todos []models.TodoDto, err error) {
	return todos, db.Table("Todos").Find(&todos).Error
}

func (db *DBORM) GetTodo(id int) (todo models.TodoDto, err error) {
	return todo, db.Table("Todos").Where("id = ?", id).First(&todo).Error
}
