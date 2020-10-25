package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/juseongkr/todo-app/server/src/models"
)

func (h *Handler) AddUser(c *gin.Context) {
	if h.db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	var json models.User
	err := c.ShouldBindJSON(&json)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.AbortWithStatus(http.StatusOK)
}

func (h *Handler) GetAllUsers(c *gin.Context) {
	if h.db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	users, err := h.db.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, users)
}
