package services

import (
	"github.com/juseongkr/todo-app/server/src/models"
)

func (db *DBORM) AddUser(user models.User) error {
	return db.Create(&user).Error
}

func (db *DBORM) GetAllUsers() (users []models.User, err error) {
	return users, db.Find(&users).Error
}
