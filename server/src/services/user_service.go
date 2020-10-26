package services

import (
	"github.com/juseongkr/todo-app/server/src/models"
	"golang.org/x/crypto/bcrypt"
	"errors"
)

func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return "", err
	}

	return string(hash), nil
}

func CheckPasswordHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	return err == nil
}

func (db *DBORM) CreateUser(user models.User) error {
	hash, err := HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hash

	return db.Create(&user).Error
}

func (db *DBORM) SignInUser(user models.User) error {
	var hash string
	password := user.Password
	err := db.Select("password").First(&user, "username = ?", user.Username).Scan(&hash).Error
	if err != nil {
		return err
	}

	valid := CheckPasswordHash(password, hash)
	if valid {
		return nil
	}

	return errors.New("unauthorized access")
}