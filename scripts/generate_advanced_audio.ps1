$ErrorActionPreference = "Stop"
$apiKey = $env:ELEVENLABS_API_KEY
if (-not $apiKey) { Write-Error "ELEVENLABS_API_KEY environment variable is not set. Set it before running this script: `$env:ELEVENLABS_API_KEY='sk_...'`"; exit 1 }
$voiceId = "ghgFyr7gmpr57xyTgX9q"
$outDir = "$PSScriptRoot\..\public\audio"

$scripts = @{
  "ch08_lara" = "Willkommen im Fortgeschrittenen-Bereich! Hier wird es richtig spannend. Ein normaler Chatbot antwortet nur auf deine Fragen. Ein KI-Agent dagegen denkt selbstständig, plant Schritte, nutzt Werkzeuge und löst Aufgaben – wie ein digitaler Mitarbeiter mit Superkräften. Stell dir vor: Du sagst einmal was du willst, und der Agent erledigt alles andere. Er liest Dateien, schreibt Code, bedient Webseiten und prüft sogar seine eigenen Ergebnisse. Genau das macht ihn so mächtig."
  "ch09_lara" = "Wann brauchst du einen Chatbot und wann einen Agenten? Ganz einfache Faustregel: Wenn du nur eine Antwort oder Information brauchst – nimm einen Chatbot wie ChatGPT oder Claude. Wenn du willst, dass die KI selbstständig eine Aufgabe erledigt – also Dateien bearbeitet, Mails schreibt oder Code baut – dann brauchst du einen Agenten. Beide haben ihre Stärken, und oft ergänzen sie sich perfekt im Alltag."
  "ch10_lara" = "Es gibt mittlerweile für jeden das richtige Agenten-System. Für Einsteiger ohne Code-Kenntnisse ist Zapier perfekt – einfach per Klick verbinden. Wer mehr Flexibilität will, nimmt n8n, das läuft sogar lokal bei dir. Für Entwickler gibt es Claude Code und OpenClaw, mit denen du echte Power-Agenten baust. Mein Tipp: Du musst nicht alles auf einmal lernen. Wähle ein System und starte damit – der Rest kommt von selbst."
  "ch11_lara" = "OpenClaw ist wie ein persönlicher Assistent mit Superkräften. Er verbindet sich mit deinen Tools, liest Dateien, sendet Nachrichten und erledigt Aufgaben – rund um die Uhr. Du brauchst nur Node.js und einen API-Schlüssel von Anthropic, dann kann es losgehen. OpenClaw ist Open Source, also kostenlos und transparent. Du kannst selbst sehen was passiert, eigene Werkzeuge ergänzen und den Agenten genau auf deine Bedürfnisse anpassen."
  "ch12_lara" = "Claude Code ist mein persönlicher Favorit! Er läuft direkt in deinem Terminal oder deiner Entwicklungsumgebung, versteht dein gesamtes Projekt und kann selbstständig Änderungen vornehmen – Dateien anlegen, Bugs fixen, Tests schreiben. Perfekt für Builder, Entwickler und alle, die ernsthaft mit KI arbeiten. Die Installation dauert nur ein paar Minuten, dann hast du einen Senior-Entwickler an deiner Seite – jederzeit verfügbar."
  "ch13_lara" = "Du brauchst keine teuren Abos! Mit Ollama läuft KI komplett auf deinem eigenen PC – kostenlos, offline und absolut privat. Deine Daten verlassen nie deinen Rechner. Mit OpenRouter wiederum bekommst du Zugang zu über vierhundert Modellen mit nur einem einzigen API-Schlüssel – von OpenAI über Google bis zu chinesischen Spitzenmodellen. So bleibst du flexibel und unabhängig von einzelnen Anbietern."
  "ch14_lara" = "Welches Modell für welche Aufgabe? Das ist die häufigste Frage die ich höre. Hier die kurze Antwort: Für einfache Texte und Mails nimm Haiku oder GPT-Mini, das ist günstig und schnell. Für Code und komplexe Logik ist Claude Sonnet ungeschlagen. Für Videos brauchst du Higgsfield oder Sora. Für lokale Anwendungen ist Ollama dein Freund. Und für Recherche mit Quellenangaben ist Perplexity unschlagbar. Merk dir: Das beste Modell ist das passende Modell."
  "ch15_lara" = "Zum Abschluss das Wichtigste: KI-Agenten sind mächtig – und genau deshalb brauchen sie klare Grenzen! Gib keinem Agenten Passwörter, Kreditkartendaten oder sensible Firmendaten ohne Nachzudenken. Lass ihn nicht ungeprüft Mails verschicken oder Zahlungen auslösen. Prüfe was er tut, gerade am Anfang. Diese Regeln schützen dich, deine Daten und deine Systeme. Wenn du das beachtest, wird KI dein bester Mitarbeiter – sicher und produktiv. Viel Erfolg auf deiner KI-Reise!"
}

foreach ($name in $scripts.Keys) {
  $text = $scripts[$name]
  $outFile = Join-Path $outDir "$name.mp3"
  Write-Host "Generating $name..."
  $wc = New-Object System.Net.WebClient
  $wc.Headers.Add("xi-api-key", $apiKey)
  $wc.Headers.Add("Content-Type", "application/json")
  $bodyObj = @{
    text = $text
    model_id = "eleven_multilingual_v2"
    voice_settings = @{ stability = 0.4; similarity_boost = 0.8 }
  }
  $body = $bodyObj | ConvertTo-Json -Compress
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
  $result = $wc.UploadData("https://api.elevenlabs.io/v1/text-to-speech/$voiceId", $bytes)
  [System.IO.File]::WriteAllBytes($outFile, $result)
  Write-Host "  -> $outFile  ($($result.Length) bytes)"
}
Write-Host "Done!"
