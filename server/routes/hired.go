package routes

import (
	"juna/handlers"
	"juna/pkg/middleware"
	"juna/pkg/mysql"
	"juna/repositories"

	"github.com/labstack/echo/v4"
)

func HiredRoutes(e *echo.Group) {
	hiredRepository := repositories.RepositoryHired(mysql.DB)
	h := handlers.HandlerHired(hiredRepository)

	e.POST("/hired", middleware.Auth(h.CreateHired))
	e.POST("/notification", h.Notification)
	e.GET("/offer", middleware.Auth(h.GetOffer))
	e.GET("/order", middleware.Auth(h.GetOrder))
}
