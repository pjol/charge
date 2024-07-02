package cards

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/pjol/charge/backend/structs"
)

func (s *Service) Get(w http.ResponseWriter, r *http.Request) {
	page := r.URL.Query().Get("page")
	pg, err := strconv.Atoi(page)
	if err != nil && page != "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	count := 10

	cards, err := getCards(pg, count, s.db)
	if err != nil {
		fmt.Println("error getting cards:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	body, err := json.Marshal(cards)
	if err != nil {
		fmt.Println("error marshalling cards:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(body)
}

func getCards(page, count int, db *sql.DB) ([]structs.Card, error) {
	var cards []structs.Card
	offset := page * count

	rows, err := db.Query(`
		SELECT name, type, cost, text, image, stat1, stat2 FROM cards LIMIT $1 OFFSET $2;
	`, count, offset)
	if err != nil {
		return cards, err
	}

	err = nil
	for rows.Next() {
		card := structs.Card{}
		err2 := rows.Scan(&card.Name, &card.Type, &card.Cost, &card.Text, &card.Image, &card.Stat1, &card.Stat2)

		if err2 != nil {
			err = err2
		} else {
			cards = append(cards, card)
		}
		err2 = nil
	}

	return cards, err
}
