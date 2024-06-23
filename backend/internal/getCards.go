package internal

import "net/http"

func GetCards(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("cards"))
}
