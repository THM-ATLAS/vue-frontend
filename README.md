# Starten der App für die Entwicklung
`docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up`  
Benutzt die Flags, wenn ihr was an den node_modules geändert habt oder generell immer, wenn ihr eine Änderung nicht live sehen könnt.   
# Starten der App als statische Website (Production)
`docker-compose up [--build --force-recreate]`   
# Herunterfahren
`docker-compose down`

