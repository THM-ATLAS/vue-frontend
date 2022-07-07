# ATLAS Frontend
[![Docker](https://github.com/THM-ATLAS/vue-frontend/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/THM-ATLAS/vue-frontend/actions/workflows/docker-publish.yml)
[![CodeQL](https://github.com/THM-ATLAS/vue-frontend/actions/workflows/codeql.yml/badge.svg)](https://github.com/THM-ATLAS/vue-frontend/actions/workflows/codeql.yml)

This is the Frontend application of the ATLAS project by students of the [Technische Hochschule Mittelhessen](https://www.thm.de/site/en/).

Refer to the [ATLAS documentation](/THM-ATLAS/vue-frontend/wiki/) for more information on usage, development and building, or visit the [ATLAS website](http://atlas.mni.thm.de/).

---

## Legacy README Content

### Entwickeln _mit_ Docker (unter Linux)  
1. Klonen des Frontend Repos   
   1. Über HTTPS  
   `git clone https://github.com/THM-ATLAS/vue-frontend.git`  
   2. Über ssh  
   `git clone git@github.com:THM-ATLAS/vue-frontend.git`   
2. Anlegen des Environment Files für den Datenbankzugriff  
Die Platzhalter müssen natürlich mit den richtigen Credentials der Datenbank ersetzt werden!
```
cd <Frontend Repo> && echo "db_source=<Link zur Datenbank>\ndb_username=<Datenbank Username>\ndb_password=<Datenbank Passwort>\nmode=api-dev" > backend_db_credentials.env
```  
3. Starten der App und des lokalen Backends für die Entwicklung  
Dabei wird immer das neueste Image des Backends verwendet.   
` docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml pull && docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up --force-recreate`   
4. Starten des THM VPN Clients   
Die App funktioniert momentan nur mit aktivem THM VPN, auch wenn man sich bereits im THM Netz vor Ort befindet!    
5. Starten einer Google Chrome Version ohne Websecurity      
Dies ist wegen Cross Origin Policies leider nötig.   
`google-chrome --disable-web-security --user-data-dir=/chromeTemp`    
6. App erreichen unter `localhost:3000`   
Änderungen im Frontend Source Code lassen sich ohne neu laden der Seite direkt im Browser sehen.    
7. Herunterfahren    
`docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down`