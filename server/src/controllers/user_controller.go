package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/sessions"
	"github.com/juseongkr/todo-app/server/src/models"
)

func (h *Handler) AuthCheck(c *gin.Context) {
	if h.db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

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
	if h.db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	session := sessions.Default(c)
	if session.Get("session-username") != nil {
		c.AbortWithStatus(http.StatusOK)
		return
	}

	session.Delete("session-username")

	c.AbortWithStatus(http.StatusOK)
}