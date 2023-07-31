package repositories

import (
	"juna/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type UserRepository interface {
	GetUser(ID int) (models.User, error)
	FindUsers() ([]models.User, error)
	FindPostByUserId(ID int) ([]models.Post, error)
	UpdateProfile(user models.User) (models.User, error)
	GetUserDetailByLogin(ID int) (models.User, error)
	GetUserDetailById(ID int) (models.User, error)
	FollowUser(userID int, followerID int) error
	UnfollowUser(userID int, followerID int) error
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.Preload("Following").Preload("Followers").First(&user, ID).Error

	return user, err
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Preload("Following").Preload("Followers").Find(&users).Error

	return users, err
}

func (r *repository) FindPostByUserId(ID int) ([]models.Post, error) {
	var post []models.Post
	err := r.db.Where("created_by=?", ID).Preload(clause.Associations).Find(&post).Error

	return post, err
}

func (r *repository) UpdateProfile(user models.User) (models.User, error) {
	err := r.db.Model(&user).Updates(user).Error

	return user, err
}

func (r *repository) GetUserDetailByLogin(ID int) (models.User, error) {
	var user models.User
	err := r.db.Preload("Followers").Preload("Following").First(&user, ID).Error

	return user, err
}

func (r *repository) GetUserDetailById(ID int) (models.User, error) {
	var user models.User
	err := r.db.Preload("Followers").Preload("Following").First(&user, ID).Error

	return user, err
}

func (r *repository) FollowUser(userID int, followerID int) error {
	// Pastikan user yang akan diikuti ada di database
	var user models.User
	if err := r.db.First(&user, userID).Error; err != nil {
		return err
	}

	// Pastikan pengikut (follower) ada di database
	var follower models.User
	if err := r.db.First(&follower, followerID).Error; err != nil {
		return err
	}

	// Hubungkan user dengan pengikut (follower) dalam asosiasi "Following"
	if err := r.db.Model(&user).Association("Following").Append(&follower); err != nil {
		return err
	}

	if err := r.db.Model(&follower).Association("Followers").Append(&user); err != nil {
		return err
	}

	return nil
}

func (r *repository) UnfollowUser(userID int, followerID int) error {
	// Pastikan user yang akan di-unfollow ada di database
	var user models.User
	if err := r.db.First(&user, userID).Error; err != nil {
		return err
	}

	// Pastikan pengikut (follower) ada di database
	var follower models.User
	if err := r.db.First(&follower, followerID).Error; err != nil {
		return err
	}

	// Hapus follower dari asosiasi "Following" user
	if err := r.db.Model(&user).Association("Following").Delete(&follower); err != nil {
		return err
	}

	// Hapus user dari asosiasi "Followers" follower
	if err := r.db.Model(&follower).Association("Followers").Delete(&user); err != nil {
		return err
	}

	return nil
}
