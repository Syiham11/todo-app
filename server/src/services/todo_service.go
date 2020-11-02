package services

import (
	"github.com/juseongkr/todo-app/server/src/models"
)

func (db *DBORM) AddTodo(username string, todo models.Todo) error {
	err := db.Select("id").First(&models.User{}, "username = ?", username).Scan(&todo.Uploader).Error
	if err != nil {
		return err
	}

	return db.Create(&todo).Error
}

func (db *DBORM) GetAllTodos() (todos []models.TodoDto, err error) {
	return todos, db.Table("Todos").Find(&todos).Error
}

func (db *DBORM) GetTodoByID(id int) (todo models.TodoDto, err error) {
	return todo, db.Table("Todos").Where("id = ?", id).First(&todo).Error
}

func (db *DBORM) GetTodosByUploader(uploader int) (todos []models.TodoDto, err error) {
	return todos, db.Table("Todos").Find(&todos, "uploader = ?", uploader).Error
}

func (db *DBORM) SetTodoByID(id int, todo models.Todo) error {
	return db.Table("Todos").Updates(&todo).Error
}

func (db *DBORM) DelTodoByID(id int) error {
	return db.Where("id = ?", id).Delete(&models.Todo{}).Error
}
