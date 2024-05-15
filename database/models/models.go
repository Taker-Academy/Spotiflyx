package models

import (
	"gorm.io/gorm"
)

type Database struct {
	Host     string
	Port     string
	Password string
	User     string
	Name     string
	DB       *gorm.DB
}

type User struct {
	Id       string `gorm:"primaryKey" json:"Id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type New_user struct {
	Email    string `bson:"email", json:"email"`
	Password string `bson:"password", json:"password"`
}

type Response_user struct {
	Token string `json:"token"`
	Email string `json:"email"`
}

type Response_get_user struct {
	Id string `json:"id"`
	Email string `json:"email"`
}

type Response_remove struct {
	Ok bool `json:"ok"`
}

type Database_spotify_favorite struct {
	Id   string `gorm:"primary_key;autoIncrement:false", json:"Id"`
	Link string `gorm:"primary_key;autoIncrement:false", json:"link"`
}

type Database_youtube_favorite struct {
	Id   string `gorm:"primary_key;autoIncrement:false", json:"Id"`
	Link string `gorm:"primary_key;autoIncrement:false", json:"link"`
}

type Contex_favorite struct {
	Link string `json:"link"`
}

type Fav_response struct {
	Ok bool `json:"ok"`
}

type Get_links_response struct {
	Ok   bool              `json:"ok"`
	Data []Contex_favorite `json:"data"`
}
