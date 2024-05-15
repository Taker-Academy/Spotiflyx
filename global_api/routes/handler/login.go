package handler

import(
	"spotiflix/database/user_handling"
	"spotiflix/database/hash"
	"encoding/json"
	"net/http"
	"io"
	"strings"
	"github.com/gin-gonic/gin"
	"spotiflix/database/models"
)

func Login(data_base models.Database) gin.HandlerFunc {
	fn := func(ctx *gin.Context) {
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
		user, err := user_handling.Find_user_by_email(data_base.DB, tmp.Email)
		if (err != nil) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err})
			return
		}
		if (hash.Hash_password(tmp.Password) != user.Password) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "incorect password"})
			return
		}
		response, err := Get_user_response(tmp.Email, user.Id)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, response)
	}
	return fn
}