package controllers

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	"github.com/juseongkr/todo-app/server/src/services"
	"os"
)

type HandlerInterface interface {
	AuthCheck(c *gin.Context)
	AuthSignUp(c *gin.Context)
	AuthSignIn(c *gin.Context)
	AuthSignOut(c *gin.Context)

	AddTodo(c *gin.Context)
	GetTodo(c *gin.Context)
	GetTodos(c *gin.Context)
}

type Handler struct {
	db services.DBLayer
}

func NewHandler(url string) (*Handler, error) {
	database, err := services.NewORM(url)
	if err != nil {
		return nil, err
	}

	return &Handler{db: database}, nil
}

func NewStore() (sessions.Store, error) {
	redis_url := os.Getenv("REDIS_PATH")
	redis_pw := os.Getenv("REDIS_PW")
	secret_key := os.Getenv("SECRET_KEY")
	store, err := redis.NewStore(10, "tcp", redis_url, redis_pw, []byte(secret_key))
	if err != nil {
		return nil, err
	}

	store.Options(sessions.Options{
		MaxAge:   1000 * 60 * 60 * 24 * 3,
		Path:     "/",
		Secure:   false, // true, https only
		HttpOnly: true,
	})

	return store, nil
}
