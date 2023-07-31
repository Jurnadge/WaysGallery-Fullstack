package handlers

import (
	"context"
	dto "juna/dto/result"
	usersdto "juna/dto/users"
	"juna/models"
	"juna/repositories"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type handlerUser struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handlerUser {
	return &handlerUser{UserRepository}
}

func (h *handlerUser) GetUser(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, err := h.UserRepository.GetUser(int(userId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: user})
}

func (h *handlerUser) UpdateProfile(c echo.Context) error {
	var (
		avatarFile, artFile *multipart.FileHeader
	)

	form, err := c.MultipartForm()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// Get files from form
	files := form.File["image"]
	if len(files) > 0 {
		avatarFile = files[0]
	}
	files = form.File["art"]
	if len(files) > 0 {
		artFile = files[0]
	}

	// Upload files to Cloudinary
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	var avatarURL string
	var artURL string
	if avatarFile != nil {
		avatarSrc, err := avatarFile.Open()
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		}
		defer avatarSrc.Close()

		// Upload avatar file directly to Cloudinary
		avatarResp, err := cld.Upload.Upload(ctx, avatarSrc, uploader.UploadParams{Folder: "WaysGallery_Profile_picture"})
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		}
		avatarURL = avatarResp.SecureURL
	}

	if artFile != nil {
		artSrc, err := artFile.Open()
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		}
		defer artSrc.Close()

		// Upload art file directly to Cloudinary
		artResp, err := cld.Upload.Upload(ctx, artSrc, uploader.UploadParams{Folder: "WaysGallery_Art"})
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		}
		artURL = artResp.SecureURL
	}

	request := usersdto.UpdateUserRequest{
		Fullname: c.FormValue("fullname"),
		Greeting: c.FormValue("greeting"),
		Avatar:   avatarURL,
		Art:      artURL,
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, err := h.UserRepository.GetUser(int(userId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Fullname != "" {
		user.Fullname = request.Fullname
	}
	if request.Greeting != "" {
		user.Greeting = request.Greeting
	}
	if request.Avatar != "" {
		user.Avatar = request.Avatar
	}
	if request.Art != "" {
		user.Art = request.Art
	}

	data, err := h.UserRepository.UpdateProfile(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: data})
}

func (h *handlerUser) FindUsers(c echo.Context) error {
	users, err := h.UserRepository.FindUsers()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: users})
}

func (h *handlerUser) GetUserDetailByLogin(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, err := h.UserRepository.GetUserDetailByLogin(int(userId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	posts, err := h.UserRepository.FindPostByUserId(int(userId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// Jika user.Followers nil, ubah menjadi slice kosong
	var followers []models.User
	if user.Followers != nil {
		for _, f := range user.Followers {
			followers = append(followers, *f)
		}
	} else {
		followers = []models.User{}
	}

	// Jika user.Following nil, ubah menjadi slice kosong
	var following []models.User
	if user.Following != nil {
		for _, f := range user.Following {
			following = append(following, *f)
		}
	} else {
		following = []models.User{}
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: usersdto.UserDetailResponse{
		ID:        int(user.ID),
		Fullname:  user.Fullname,
		Email:     user.Email,
		Greeting:  user.Greeting,
		Avatar:    user.Avatar,
		Post:      posts,
		Arts:      user.Art,
		Followers: followers,
		Following: following,
	}})
}

func (h *handlerUser) GetUserDetailById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUserDetailById(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	posts, err := h.UserRepository.FindPostByUserId(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// Jika user.Followers nil, ubah menjadi slice kosong
	var followers []models.User
	if user.Followers != nil {
		for _, f := range user.Followers {
			followers = append(followers, *f)
		}
	} else {
		followers = []models.User{}
	}

	// Jika user.Following nil, ubah menjadi slice kosong
	var following []models.User
	if user.Following != nil {
		for _, f := range user.Following {
			following = append(following, *f)
		}
	} else {
		following = []models.User{}
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: usersdto.UserDetailResponse{
		ID:        int(user.ID),
		Fullname:  user.Fullname,
		Email:     user.Email,
		Greeting:  user.Greeting,
		Avatar:    user.Avatar,
		Post:      posts,
		Arts:      user.Art,
		Followers: followers,
		Following: following,
	}})
}

func (h *handlerUser) FollowUser(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)
	followerID, _ := strconv.Atoi(c.Param("followerID"))

	// Konversi userID dan followerID ke tipe data yang sesuai (misalnya int)
	// Jika diperlukan, Anda bisa menggunakan strconv.Atoi(userID) untuk mengubahnya menjadi int

	// Panggil fungsi FollowUser dari repository
	if err := h.UserRepository.FollowUser(int(userId), followerID); err != nil {
		// Tangani error jika diperlukan
		return c.String(http.StatusInternalServerError, "Error following user")
	}

	// Jika berhasil, kembalikan respon OK
	return c.String(http.StatusOK, "Successfully followed user")
}

func (h *handlerUser) UnfollowUser(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userIdFloat64 := userLogin.(jwt.MapClaims)["id"].(float64)
	userId := int(userIdFloat64)

	followerID, err := strconv.Atoi(c.Param("followerID"))
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid follower ID")
	}

	if err := h.UserRepository.UnfollowUser(userId, followerID); err != nil {
		return c.String(http.StatusInternalServerError, "Error unfollowing user")
	}

	return c.String(http.StatusOK, "Successfully unfollowed user")
}
