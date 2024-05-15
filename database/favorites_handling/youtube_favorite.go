package favorite_handling

import (
	"spotiflix/database/models"

	"gorm.io/gorm"
)

func Get_youtube_favorte_by_Id(Id string, database *gorm.DB) []models.Database_youtube_favorite {
	var search_favorites []models.Database_youtube_favorite

	_ = database.Find(&search_favorites, "id = ?", Id).Select(Id)
	return search_favorites
}

func Insert_in_youtube_favorites(database *gorm.DB, id string, link string) {
	fav := Get_youtube_favorte_by_Id(id, database)

	for i := 0; i < len(fav); i += 1 {
		if fav[i].Link == link {
			database.Where("id = ? AND link = ?", id, link).Delete(&models.Database_youtube_favorite{})
			return
		}
	}
	database.Create(models.Database_youtube_favorite{Id: id, Link: link})
}
