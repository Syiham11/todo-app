package models

import (
	"github.com/jinzhu/gorm"
)

type Todo struct {
	gorm.Model
	Uploader    int    `gorm:"column:uploader" json:"uploader"`
	Title       string `gorm:"column:title" json:"title" binding:"required"`
	Description string `gorm:"column:description" json:"description" binding:"required"`
	Favorite    *bool  `gorm:"column:favorite" json:"favorite"`
	Complete    *bool  `gorm:"column:complete" json:"complete"`
}

type TodoDto struct {
	Id          int    `json:"id"`
	Uploader    int    `json:"uploader"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Favorite    bool   `json:"favorite"`
	Complete    bool   `json:"complete"`
}

func (Todo) TableName() string {
	return "Todos"
}
