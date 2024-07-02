package cards

import (
	"net/http"

	"github.com/pjol/charge/backend/structs"
)

func (*Service) Get(w http.ResponseWriter, r *http.Request) {

}

func getCards(page, count int) ([]structs.Card, error) {

	return nil, nil
}
