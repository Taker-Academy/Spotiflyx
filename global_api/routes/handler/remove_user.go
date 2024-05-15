package handler

import(
	"spotiflix/global_api/token"
	"encoding/json"
	"net/http"
	"io"
	"strings"
	"github.com/gin-gonic/gin"
	"spotiflix/database/models"
)

func Remove_user(data_base models.Database) gin.HandlerFunc {
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
		var tmp models.New_user
		json.Unmarshal(json_data, &tmp)
		decoder := json.NewDecoder(strings.NewReader(string(json_data)))
		decoder.DisallowUnknownFields()
		err = decoder.Decode(&tmp)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}
		data_base.DB.Where("id = ?", token_id).Delete(&models.User{})
		ctx.JSON(http.StatusOK, models.Response_remove{Ok: true})
	}
	return fn
}
