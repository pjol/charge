package structs

type Card struct {
	Name  string  `json:"name"`
	Type  string  `json:"type"`
	Cost  int     `json:"cost"`
	Text  *string `json:"text"`
	Image *string `json:"image"`
	Stat1 *int    `json:"stat1"`
	Stat2 *int    `json:"stat2"`
}
