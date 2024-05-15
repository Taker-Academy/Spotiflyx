package handler

import (
	"encoding/json"
	"io"
	"net/http"
	"spotiflix/database/models"
	"spotiflix/database/favorites_handling"
	"spotiflix/global_api/token"
	"strings"

	"github.com/gin-gonic/gin"
)

func Set_favorite_video(data_base models.Database) gin.HandlerFunc {
	fn := func(ctx *gin.Context) {
		token_id, err, code := token.Verify_token(ctx)
		if err != nil {
			ctx.JSON(code, err)
			return
		}
		json_data, err := io.ReadAll(ctx.Request.Body)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		var tmp models.Contex_favorite
		json.Unmarshal(json_data, &tmp)
		decoder := json.NewDecoder(strings.NewReader(string(json_data)))
		decoder.DisallowUnknownFields()
		err = decoder.Decode(&tmp)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}
		favorite_handling.Insert_in_youtube_favorites(data_base.DB, token_id, tmp.Link)
		ctx.JSON(http.StatusOK, models.Fav_response{Ok: true})
	}
	return fn
}
