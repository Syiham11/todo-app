package app

import (
	"github.com/juseongkr/todo-app/server/src/controllers"
	"github.com/juseongkr/todo-app/server/src/middlewares"
	"github.com/fvbock/endless"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/static"
	"github.com/gin-contrib/sessions"
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

	apiGroup := r.Group("/api")
	{
		authGroup := apiGroup.Group("/auth")
		{
			authGroup.GET("/check", handler.AuthCheck)
			authGroup.POST("/signin", middlewares.IsNotSigned(), handler.AuthSignIn)
			authGroup.POST("/signup", middlewares.IsNotSigned(), handler.AuthSignUp)
			authGroup.GET("/signout", middlewares.IsSigned(), handler.AuthSignOut)
		}

		apiGroup.GET("/todos", handler.GetTodos)
		todoGroup := apiGroup.Group("/todo")
		{
			todoGroup.POST("", middlewares.IsSigned(), handler.AddTodo)
		}
	}

	r.Use(middlewares.ErrorHandler())
	r.Use(middlewares.EndPointHandler())

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
