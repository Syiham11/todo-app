package app

import (
	"github.com/fvbock/endless"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/juseongkr/todo-app/server/src/controllers"
	"github.com/juseongkr/todo-app/server/src/middlewares"
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

	r.Use(static.Serve("/", static.LocalFile("build", true)))
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
			todoGroup.PUT("/:id", middlewares.IsSigned(), handler.GetTodoByID)
			todoGroup.DELETE("/:id", middlewares.IsSigned(), handler.GetTodoByID)
			todoGroup.GET("/:id", handler.GetTodoByID)
		}
	}

	r.Use(middlewares.ErrorHandler())
	r.Use(middlewares.EndPointHandler())

	return endless.ListenAndServe(":"+port, r)
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
