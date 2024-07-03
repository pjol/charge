package router

import (
	"fmt"
	"log"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/pjol/charge/backend/internal/db"
	"github.com/pjol/charge/backend/pkg/cards"
)

func AppRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))
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

	return r
}
