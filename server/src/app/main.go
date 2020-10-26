package app

import (
	"github.com/juseongkr/todo-app/server/src/controllers"
	"github.com/juseongkr/todo-app/server/src/middlewares"
	"github.com/fvbock/endless"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
	"os"
)

func Logger() {
	gin.DisableConsoleColor()
	f, _ := os.Create("logs/gin.log")
	gin.DefaultWriter = io.MultiWriter(f)
}

func RunServerWithHandler(port string, handler controllers.HandlerInterface) error {
	r := gin.Default()

	r.Use(static.ServeRoot("/", "../public/build"))
	r.Use(middlewares.MyMiddleware())

	apiGroup := r.Group("/api")
	{
		apiGroup.GET("/ping", func(c *gin.Context) {
			name := c.Query("name")
			c.JSON(http.StatusOK, gin.H{"name": name})
		})

		userGroup := apiGroup.Group("/user")
		{
			userGroup.POST("", handler.AddUser)
		}

		apiGroup.GET("/todos", handler.GetTodos)
		todoGroup := apiGroup.Group("/todo")
		{
			todoGroup.POST("", handler.AddTodo)
		}
	}

	return endless.ListenAndServe(":"+port, r)
}

func RunServer() error {
	url := os.Getenv("DB_PATH")
	port := os.Getenv("PORT")

	handler, err := controllers.NewHandler(url)
	if err != nil {
		return err
	}

	return RunServerWithHandler(port, handler)
}
