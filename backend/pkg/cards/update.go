package cards

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/pjol/charge/backend/structs"
)

func (s *Service) Update(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	body, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error reading req body: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	card := &structs.Card{}

	err = json.Unmarshal(body, card)
	if err != nil {
		fmt.Println("error unmarshalling json: ", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = updateCard(s.db, card)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusAccepted)
}

func updateCard(db *sql.DB, card *structs.Card) error {

	fmt.Println(*card.Id)
	if card.Id == nil {
		return fmt.Errorf("err: no id given")
	}

	_, err := db.Exec(`
    UPDATE cards SET
      name = $1,
      type = $2,
      cost = $3,
      text = $4,
      image = $5,
      stat1 = $6,
      stat2 = $7
    WHERE id = $8;
  `, card.Name, card.Type, card.Cost, card.Text, card.Image, card.Stat1, card.Stat2, card.Id)
	if err != nil {
		fmt.Println("error updating card: ", err)
		return err
	}

	return nil
}
