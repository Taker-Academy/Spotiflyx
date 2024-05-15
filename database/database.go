package database

import (
	"fmt"
	"os"
	"spotiflix/database/models"
	"time"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func load_env(database *models.Database) {
	godotenv.Load()

	database.Host = (os.Getenv("DB_HOST"))
	database.Port = (os.Getenv("DB_PORT"))
	database.Password = (os.Getenv("DB_PASSWORD"))
	database.User = (os.Getenv("DB_USER"))
}

func Init_database() (models.Database, error) {
	var new models.Database
	var err error

	load_env(&new)
	dsn := fmt.Sprintf(
		"host=db user=%s password=%s dbname=%s port=5432 sslmode=disable",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)
	new.DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		_ = new.DB.Exec("CREATE DATABASE IF NOT EXISTS " + os.Getenv("DB_NAME") + ";")
		for i := 0; i < 15; i += 1 {
			new.DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
			if err == nil {
				break
			}
			time.Sleep(2 * time.Second)
		}
		if err != nil {
			return models.Database{}, err
		}
	}
	new.DB.AutoMigrate(&models.User{})
	new.DB.AutoMigrate(&models.Database_spotify_favorite{})
	new.DB.AutoMigrate(&models.Database_youtube_favorite{})
	return new, nil
}
