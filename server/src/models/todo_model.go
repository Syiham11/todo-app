package models

import (
	"github.com/jinzhu/gorm"
)

type Todo struct {
	gorm.Model
	Uploader     string `gorm:"column:uploader" json:"uploader"`
	Title        string `gorm:"column:title" json:"title" binding:"required"`
	Description  string `gorm:"column:description" json:"description" binding:"required"`
	Flag         bool   `gorm:column:flag" json:"flag" binding:"required"`
}

func (Todo) TableName() string {
	return "Todos"
}
