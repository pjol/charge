package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func InitDB(name string) (*sql.DB, error) {
	dbFolderPath := "./data"
	dbPath := fmt.Sprintf("%s/%s.db", dbFolderPath, name)

	if !Exists(dbFolderPath) {
		fmt.Printf("no %s db folder found... creating\n", name)
		os.Mkdir(dbFolderPath, os.ModePerm)
	}

	if !Exists(dbPath) {
		fmt.Printf("no %s db found... creating\n", name)

		os.Create(dbPath)
	}

	fmt.Printf("connecting to %s db...\n", name)

	db, err := sql.Open("sqlite3", fmt.Sprintf("file:%s", dbPath))

	InitTables(name, db)

	if err != nil {
		return nil, err
	}

	return db, nil

}

func Exists(path string) bool {
	exists := true
	_, err := os.Stat(path)
	if err != nil {
		fmt.Println(err)
		exists = false
	}

	if os.IsExist(err) {
		exists = true
	}

	return exists
}

func InitTables(name string, db *sql.DB) {
	// db.Exec(fmt.Sprintf("CREATE DATABASE %s", name))
	switch name {
	case "cards":
		_, err := db.Exec(`
			CREATE TABLE IF NOT EXISTS cards (
				name string PRIMARY KEY,
				type string NOT NULL,
				cost int,
				text string,
				image string,
				stat1 string,
				stat2 string
			)
		`)

		if err != nil {
			fmt.Printf("error creating cards table: %s\n", err)
		}
	}
}
