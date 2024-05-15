package user_handling

import (
	"errors"
	"spotiflix/database/hash"
	"spotiflix/database/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func Find_user_by_email(database *gorm.DB, email string) (models.User, error) {
	var search_user []models.User

	_ = database.First(&search_user, "email = ?", email).Select(email)
	if len(search_user) == 0 {
		return models.User{}, errors.New("email not found")
	}
	return search_user[0], nil
}

func Insert_new_user(database *gorm.DB, email string, password string) (string, error) {
	_, err := Find_user_by_email(database, email)
	if err == nil {
		return "", errors.New("email allready used")
	}
	var new models.User
	new.Id = uuid.NewString()
	new.Email = email
	new.Password = hash.Hash_password(password)

	database.Create(new)
	return new.Id, nil
}
