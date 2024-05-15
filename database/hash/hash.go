package hash

import(
	"crypto/sha256"
	"encoding/hex"
)

func Hash_password(password string) (string) {
	hash := sha256.New()
	hash.Write([]byte(password))
	bs := hash.Sum(nil)

	return hex.EncodeToString(bs)
}