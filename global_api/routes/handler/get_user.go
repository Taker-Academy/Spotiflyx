package handler

import (
	"encoding/json"
	"io"
	"net/http"
	"spotiflix/database/models"
	"spotiflix/global_api/token"
	"strings"

	"github.com/gin-gonic/gin"
)

func Get_user_response_id(Email string, Id string) (models.Response_get_user) {
	var to_return models.Response_get_user

	to_return.Id = Id
	to_return.Email = Email
	return to_return
}


func Get_user(data_base models.Database) gin.HandlerFunc {
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
		var user models.User
		result := data_base.DB.Model(models.User{}).Where("id = ?", token_id).First(&user)
		if result.Error != nil {
			ctx.JSON(http.StatusInternalServerError, result.Error)
			return
		}
		response := Get_user_response_id(user.Email, token_id)
		ctx.JSON(http.StatusOK, response)
	}
	return fn
}
