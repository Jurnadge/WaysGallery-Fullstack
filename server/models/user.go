package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email     string  `json:"email" gorm:"type: varchar(255)"`
	Password  string  `json:"password" gorm:"type: varchar(255)"`
	Fullname  string  `json:"fullname" gorm:"type: varchar(255)"`
	Greeting  string  `json:"greeting" gorm:"type: varchar(255)"`
	Avatar    string  `json:"image" gorm:"type: varchar(255)" form:"image"`
	Art       string  `json:"art" gorm:"type: varchar(255)" form:"art"`
	Following []*User `json:"following" gorm:"many2many:following_user;association_jointable_foreignkey:following_id"`
	Followers []*User `json:"followers" gorm:"many2many:followers_user;association_jointable_foreignkey:follower_id"`
}
