package cards

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/pjol/charge/backend/structs"
)

func (s *Service) Add(w http.ResponseWriter, r *http.Request) {
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

	err = addCard(s.db, card)
	if err != nil {
		fmt.Println("error adding card: ", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func addCard(db *sql.DB, card *structs.Card) error {
	_, err := db.Exec(`
		INSERT INTO cards (
			name,
			type,
			cost,
			text,
			image,
			stat1,
			stat2
		) VALUES ($1, $2, $3, $4, $5, $6, $7)
	`, card.Name, card.Type, card.Cost, card.Text, card.Image, card.Stat1, card.Stat2)

	if err != nil {
		return fmt.Errorf("error adding card: %s", err)
	}

	return nil
}
