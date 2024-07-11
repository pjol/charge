package cards

import (
	"net/http"
	"strconv"
)

func (s *Service) GetCountMiddleware() func(next http.Handler) http.Handler {

	return func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			var c int
			var m int
			res := s.db.QueryRow(`
				SELECT MAX(id) FROM cards;
			`)

			res.Scan(&m)

			res = s.db.QueryRow(`
				SELECT COUNT(*) FROM cards;
			`)

			res.Scan(&c)

			count := strconv.Itoa(c)
			max := strconv.Itoa(m)
			w.Header().Add("Card-Count", count)
			w.Header().Add("Card-Max", max)
			next.ServeHTTP(w, r)
		}
		return http.HandlerFunc(fn)
	}
}
