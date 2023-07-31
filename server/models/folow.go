package models

type Follow struct {
	Follower  User `json:"follower"`
	Following User `json:"following"`
}
