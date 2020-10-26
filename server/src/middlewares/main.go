package middlewares

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

func IsSigned() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		if session.Get("session-username") == nil {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}

func IsNotSigned() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		if session.Get("session-username") != nil {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Next()
	}
}

func EndPointHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/")
	}
}
