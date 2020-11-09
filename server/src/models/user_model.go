package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username   string `gorm:"column:username" json:"username" binding:"required,max=64"`
	Password   string `gorm:"column:password" json:"password" binding:"required,max=255"`
	IpAddress  string `gorm:"column:ip_address" json:"ip_address"`
	LastAccess string `gorm:"column:last_access" json:"last_access"`
}

func (User) TableName() string {
	return "Users"
}
