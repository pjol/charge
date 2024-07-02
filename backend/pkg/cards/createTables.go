package cards

import (
	"database/sql"
	"fmt"
)

func CreateTables(db *sql.DB) error {
	_, err := db.Exec(`
	CREATE TABLE IF NOT EXISTS cards (
		name string PRIMARY KEY,
		type string NOT NULL,
		cost int,
		text string,
		image string,
		stat1 string,
		stat2 string,
		time_created timestamp default current_timestamp
	);
`)

	if err != nil {
		return fmt.Errorf("error creating cards table: %s", err)
	}

	return nil
}
