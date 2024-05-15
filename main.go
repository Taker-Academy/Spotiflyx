package main

import (
	"fmt"
	"spotiflix/database"
	"spotiflix/global_api/cors_handler"
	"spotiflix/global_api/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors_handler.Setup_Header())

	database, err := database.Init_database()
	if err != nil {
		fmt.Println("failed to load database")
		return
	}
	routes.Setup_routes(router, database)
	router.Run("0.0.0.0:8080")
}
