```mermaid
sequenceDiagram
  note left of selain: käyttäjä lähettää datan painamalla "Save"
  selain-)palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
  note right of palvelin: uusi note lisätään listalle
  palvelin--)selain: 302: uudelleenohjauspyyntö sivulle /notes
  selain-)palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes
  palvelin--)selain: HTML-koodi
  selain-)palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  palvelin--)selain: main.css
  selain-)palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  palvelin--)selain: main.js
  selain-)palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  palvelin--)selain: data.json
  note left of selain: käyttäjän data näkyy sivulla
