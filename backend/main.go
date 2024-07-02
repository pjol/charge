package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/pjol/charge/backend/internal/db"
	"github.com/pjol/charge/backend/pkg/cards"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("starting server...")

	godotenv.Load()

	fmt.Println("env loaded")

	port := os.Getenv("PORT")

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	fmt.Println("middleware active")

	cardsDb, err := db.InitDB("cards")
	if err != nil {
		log.Fatalf("failed to initialize cards db: %s", err)
	}

	fmt.Println("connected to cards db")

	cards := cards.NewService(cardsDb)

	r.Route("/cards", func(r chi.Router) {
		r.Get("/", cards.Get)
		r.Post("/", cards.Add)
	})

	fmt.Printf("now listening on port %s\n", port)
	http.ListenAndServe(fmt.Sprintf(":%s", port), r)
}
