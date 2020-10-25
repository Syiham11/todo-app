package models

import (
	"github.com/jinzhu/gorm"
)

type Todo struct {
	gorm.Model
	Uploader     string `gorm:"column:uploader" json:"uploader"`
	Title        string `gorm:"column:title" json:"title"`
	Desccription string `gorm:"column:description" json:"desc"`
	Flag         bool   `gorm:column:flag" json:"flag"`
}

func (Todo) TableName() string {
	return "Todos"
}
