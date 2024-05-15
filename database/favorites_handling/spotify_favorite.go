package favorite_handling

import (
	"spotiflix/database/models"

	"gorm.io/gorm"
)

func Get_spotify_favorte_by_Id(Id string, database *gorm.DB) []models.Database_spotify_favorite {
	var search_favorites []models.Database_spotify_favorite

	_ = database.Find(&search_favorites, "id = ?", Id).Select(Id)
	return search_favorites
}

func Insert_in_spotify_favorites(database *gorm.DB, id string, link string) {
	fav := Get_spotify_favorte_by_Id(id, database)

	for i := 0; i < len(fav); i += 1 {
		if fav[i].Link == link {
			database.Where("id = ? AND link = ?", id, link).Delete(&models.Database_spotify_favorite{})
			return
		}
	}
	database.Create(models.Database_spotify_favorite{Id: id, Link: link})
}
