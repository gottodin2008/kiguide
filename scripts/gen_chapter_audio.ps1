# Generate audio for chapters 2-7 via ElevenLabs (UTF-8 safe)
$apiKey = $env:ELEVENLABS_API_KEY
if (-not $apiKey) { Write-Error "ELEVENLABS_API_KEY environment variable is not set. Set it before running this script: `$env:ELEVENLABS_API_KEY='sk_...'`"; exit 1 }
$voiceId = "ghgFyr7gmpr57xyTgX9q"
$outDir  = "C:\Users\djherky\.claude\Medien ausgabe\ki-guide\public\audio"

# Each chapter: short clear German text with real umlauts (UTF-8 source)
$chapters = @(
  @{ name = "ch02_lara.mp3"; text = "KI ist unglaublich vielseitig. Du kannst Texte schreiben wie E-Mails und Berichte. Du kannst Bilder generieren aus einer kurzen Beschreibung. Du kannst Programmcode schreiben fuer deine eigenen Apps. Und du kannst Daten analysieren, zum Beispiel Tabellen und Statistiken. Klicke auf eine Kachel unten und ich zeige dir ein konkretes Beispiel." }
  @{ name = "ch03_lara.mp3"; text = "KI ist ueberall um dich herum. Im Kundenservice beantworten Chatbots Anfragen rund um die Uhr. In der Medizin werten Aerzte mit KI Roentgenbilder aus. Google Maps nutzt KI fuer die schnellste Route. Banken erkennen damit Betrug. Und in der Industrie steuern Roboter mit KI ganze Produktionslinien." }
  @{ name = "ch04_lara.mp3"; text = "Es gibt viele KI-Plattformen. ChatGPT von OpenAI ist der bekannteste Allrounder. Claude von Anthropic ist besonders stark bei langen Texten und Code. Gemini ist die KI von Google, perfekt integriert in Gmail und Docs. Und Perplexity ist eine KI-Suchmaschine, die immer ihre Quellen nennt. Fuer Einsteiger empfehle ich ChatGPT oder Claude. Beide sind kostenlos." }
  @{ name = "ch05_lara.mp3"; text = "Hinter den Plattformen stecken grosse Sprachmodelle, kurz LLMs. OpenAI hat GPT fuer allgemeine Aufgaben. Anthropic bietet Claude in drei Staerken: Haiku ist schnell, Sonnet ist ausgewogen, und Opus ist fuer die schwierigsten Aufgaben. Google hat Gemini mit starker Integration. Und Meta veroeffentlicht Llama als Open-Source-Modell, das du kostenlos auf deinem PC nutzen kannst." }
  @{ name = "ch06_lara.mp3"; text = "Es gibt drei Preismodelle. Erstens: kostenlos. ChatGPT, Claude und Gemini bieten kostenlose Versionen mit taeglichem Limit. Zweitens: Pro-Abos. Fuer etwa zwanzig Euro pro Monat bekommst du die neuesten Modelle ohne Limit. Und drittens: API-Zugang. Du zahlst nur was du nutzt - ideal fuer eigene Apps oder Entwickler." }
  @{ name = "ch07_lara.mp3"; text = "Genug Theorie - jetzt geht es ans Ueben! Ich habe acht praktische Uebungen fuer dich. Du lernst E-Mails zu schreiben, Social-Media-Posts zu erstellen, Bilder mit KI zu generieren, To-do-Listen zu planen, schwierige Themen einfach erklaeren zu lassen, und ganze Events zu organisieren. Jede Uebung hat einen fertigen Prompt, den du sofort ausprobieren kannst." }
)

# Replace ASCII transliterations with real German umlauts before sending
function Convert-ToGerman {
  param([string]$s)
  # Order matters: longer first
  $s = $s.Replace("Ae", [char]0x00C4).Replace("Oe", [char]0x00D6).Replace("Ue", [char]0x00DC)
  $s = $s.Replace("ae", [char]0x00E4).Replace("oe", [char]0x00F6).Replace("ue", [char]0x00FC)
  $s = $s.Replace("ss", [char]0x00DF)
  return $s
}

# But that breaks words like "sein", "groessten"...
# Better: write ASCII source above and target text uses proper unicode directly
# Use \uXXXX in JSON to bypass file encoding issues

function Encode-JsonText {
  param([string]$s)
  $sb = New-Object System.Text.StringBuilder
  foreach ($c in $s.ToCharArray()) {
    $code = [int][char]$c
    if ($code -gt 127) {
      [void]$sb.AppendFormat('\u{0:x4}', $code)
    } elseif ($c -eq '"') {
      [void]$sb.Append('\"')
    } elseif ($c -eq '\') {
      [void]$sb.Append('\\')
    } elseif ($c -eq "`n") {
      [void]$sb.Append('\n')
    } else {
      [void]$sb.Append($c)
    }
  }
  return $sb.ToString()
}

foreach ($ch in $chapters) {
  $outPath = Join-Path $outDir $ch.name
  Write-Output ("[" + $ch.name + "] generating...")

  # Replace ASCII placeholders with proper umlauts (case-sensitive .NET Replace)
  $text = $ch.text
  $ae  = [char]0x00E4; $oe = [char]0x00F6; $ue = [char]0x00FC
  $Ae  = [char]0x00C4; $Oe = [char]0x00D6; $Ue = [char]0x00DC
  $sz  = [char]0x00DF
  $text = $text.Replace("ueberall",       $ue + "berall")
  $text = $text.Replace("Aerzte",         $Ae + "rzte")
  $text = $text.Replace("Roentgenbilder", "R" + $oe + "ntgenbilder")
  $text = $text.Replace("Fuer",           "F" + $ue + "r")
  $text = $text.Replace("fuer",           "f" + $ue + "r")
  $text = $text.Replace("grosse",         "gro" + $sz + "e")
  $text = $text.Replace("Staerken",       "St" + $ae + "rken")
  $text = $text.Replace("veroeffentlicht","ver" + $oe + "ffentlicht")
  $text = $text.Replace("taeglichem",     "t" + $ae + "glichem")
  $text = $text.Replace("Ueben",          $Ue + "ben")
  $text = $text.Replace("Uebungen",       $Ue + "bungen")
  $text = $text.Replace("Uebung",         $Ue + "bung")
  $text = $text.Replace("erklaeren",      "erkl" + $ae + "ren")

  $textJson = Encode-JsonText $text
  $body = '{"text":"' + $textJson + '","model_id":"eleven_multilingual_v2","voice_settings":{"stability":0.4,"similarity_boost":0.8}}'
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
  $wc = New-Object System.Net.WebClient
  $wc.Headers.Add("xi-api-key", $apiKey)
  $wc.Headers.Add("Content-Type", "application/json")
  try {
    $result = $wc.UploadData("https://api.elevenlabs.io/v1/text-to-speech/" + $voiceId, $bytes)
    [System.IO.File]::WriteAllBytes($outPath, $result)
    Write-Output ("  saved: " + $outPath + " (" + $result.Length + " bytes)")
  } catch {
    Write-Output ("  ERROR: " + $_.Exception.Message)
  }
}

Write-Output "DONE"
