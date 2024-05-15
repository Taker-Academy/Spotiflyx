package routes

import (
	"spotiflix/database/models"
	"spotiflix/global_api/routes/handler"

	"github.com/gin-gonic/gin"
)

func Setup_routes(router *gin.Engine, data_base models.Database) {
	router.POST("/auth/register", handler.Create_user(data_base))
	router.POST("/auth/login", handler.Login(data_base))
	router.PUT("/user/update", handler.Update_user(data_base))
	router.DELETE("/user/remove", handler.Remove_user(data_base))
	router.GET("/user", handler.Get_user(data_base))
	router.POST("/fav/music", handler.Set_favorite_music(data_base))
	router.GET("/fav/music", handler.Get_favorite_music(data_base))
	router.POST("/fav/video", handler.Set_favorite_video(data_base))
	router.GET("/fav/video", handler.Get_favorite_video(data_base))
}
