package middlewares

import (
	"github.com/gin-gonic/gin"
	"fmt"
)

func MyMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("=================")
		c.Next()
	}
}
