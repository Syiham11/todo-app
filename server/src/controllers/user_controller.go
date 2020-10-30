package controllers

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/juseongkr/todo-app/server/src/models"
	"net/http"
)

func (h *Handler) AuthCheck(c *gin.Context) {
	session := sessions.Default(c)
	if session.Get("session-username") != nil {
		c.AbortWithStatus(http.StatusOK)
		return
	}

	c.AbortWithStatus(http.StatusUnauthorized)
}

func (h *Handler) AuthSignUp(c *gin.Context) {
	if h.db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = h.db.CreateUser(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.AbortWithStatus(http.StatusOK)
}

func (h *Handler) AuthSignIn(c *gin.Context) {
	if h.db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	var user models.User
	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = h.db.SignInUser(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	session := sessions.Default(c)
	session.Set("session-username", user.Username)
	session.Save()

	c.AbortWithStatus(http.StatusOK)
}

func (h *Handler) AuthSignOut(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	session.Options(sessions.Options{MaxAge: -1})
	session.Save()
	c.SetCookie("session-cookie", "", -1, "/", "", false, true) // Delete cookie

	c.AbortWithStatus(http.StatusOK)
}
