package handler

import (
	"net/http"
	favorite_handling "spotiflix/database/favorites_handling"
	"spotiflix/database/models"
	"spotiflix/global_api/token"

	"github.com/gin-gonic/gin"
)

func Get_favorite_music(data_base models.Database) gin.HandlerFunc {
	fn := func(ctx *gin.Context) {
		token_id, err, code := token.Verify_token(ctx)
		if err != nil {
			ctx.JSON(code, err)
			return
		}
		links := favorite_handling.Get_spotify_favorte_by_Id(token_id, data_base.DB)
		var response []models.Contex_favorite
		for i := 0; i < len(links); i += 1 {
			response = append(response, models.Contex_favorite{Link: links[i].Link})
		}
		ctx.JSON(http.StatusOK, models.Get_links_response{Ok: true, Data: response})
	}
	return fn
}
