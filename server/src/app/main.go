package app

import (
	"github.com/juseongkr/todo-app/server/src/controllers"
	"github.com/juseongkr/todo-app/server/src/middlewares"
	"github.com/fvbock/endless"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/static"
	"github.com/gin-contrib/sessions"
	"net/http"
	"io"
	"os"
)

func Logger() {
	gin.DisableConsoleColor()
	f, _ := os.Create("logs/gin.log")
	gin.DefaultWriter = io.MultiWriter(f)
}

func RunServerWithHandler(port string, handler controllers.HandlerInterface) error {
	r := gin.Default()

	store, err := controllers.NewStore()
	if err != nil {
		return err
	}

	r.Use(static.ServeRoot("/", "../public/build"))
	r.Use(sessions.Sessions("session-cookie", store))
	r.Use(middlewares.MyMiddleware())

	apiGroup := r.Group("/api")
	{
		apiGroup.GET("/ping", func(c *gin.Context) {
			name := c.Query("name")
			session := sessions.Default(c)

			session.Set("session-uid", 1)
			session.Save()

			c.JSON(http.StatusOK, gin.H{"name": name})
		})

		authGroup := apiGroup.Group("/auth")
		{
			authGroup.GET("/check", handler.AuthCheck)
			authGroup.POST("/signin", handler.AuthSignIn)
			authGroup.POST("/signup", handler.AuthSignUp)
			authGroup.GET("/signout", handler.AuthSignOut)
		}

		apiGroup.GET("/todos", handler.GetTodos)
		todoGroup := apiGroup.Group("/todo")
		{
			todoGroup.POST("", handler.AddTodo)
		}
	}

	return endless.ListenAndServe(":" + port, r)
}

func RunServer() error {
	port := os.Getenv("PORT")
	db_url := os.Getenv("DB_PATH")

	handler, err := controllers.NewHandler(db_url)
	if err != nil {
		return err
	}

	return RunServerWithHandler(port, handler)
}
