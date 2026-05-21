# ASCII-only script: generates 11 Lara poses via Higgsfield Soul V2
$soulId = "0314d915-02ac-4f99-b8a6-8ec66be308bb"
$baseLook = "Lara, brunette woman with long brown hair, wearing a grey business suit jacket with light blue shirt, standing in front of a pure white seamless studio background, full body shot, professional photography, sharp focus, 9:16 portrait orientation, soft cinematic lighting"
$outDir = "C:\Users\djherky\.claude\Medien ausgabe\ki-guide\public\lara\poses"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$poses = @(
  @{ name = "01_intro";    prompt = "$baseLook, holding smartphone in left hand displayed towards camera, right hand making a friendly welcoming gesture, warm smile, looking directly at camera, inviting body language" }
  @{ name = "02_classic";  prompt = "$baseLook, holding smartphone in left hand, right index finger raised pointing upward in a teaching gesture explaining a rule, slight serious focused expression" }
  @{ name = "03_ml";       prompt = "$baseLook, both hands open palms facing up moving outward as if presenting growing data, eyes looking thoughtfully to the side, intelligent expression" }
  @{ name = "04_genai";    prompt = "$baseLook, smartphone in left hand, right hand making a sweeping creative gesture as if conjuring something, joyful inspired expression, slight tilt of head" }
  @{ name = "05_llm";      prompt = "$baseLook, smartphone held up in left hand near her face, right hand near her chin in a thoughtful speaking gesture, slight smile, mid-conversation pose" }
  @{ name = "06_alltag";   prompt = "$baseLook, both arms slightly open in a wide welcoming embracing gesture, smartphone in left hand, warm confident smile, looking at camera" }
  @{ name = "07_text";     prompt = "$baseLook, holding smartphone in left hand horizontally, right index finger tapping or typing motion on the smartphone screen, focused expression" }
  @{ name = "08_image";    prompt = "$baseLook, both hands framing a rectangle in the air as if framing a picture, smartphone in left hand visible, creative artistic gesture, slight smile" }
  @{ name = "09_music";    prompt = "$baseLook, smartphone in left hand, right hand making a rhythmic conducting gesture, head slightly tilted as if listening to music, eyes closed gently with a smile" }
  @{ name = "10_code";     prompt = "$baseLook, both hands raised in front of her in typing gesture as if at an invisible keyboard, smartphone tucked under arm, focused intelligent expression" }
  @{ name = "11_automate"; prompt = "$baseLook, right hand making a circular motion as if showing a process flow, smartphone in left hand, confident smile, looking at camera" }
)

foreach ($p in $poses) {
  $outFile = Join-Path $outDir ($p.name + ".png")
  if (Test-Path $outFile) {
    Write-Output ("SKIP " + $p.name + " - exists")
    continue
  }
  Write-Output ("[" + $p.name + "] generating...")
  $raw = & higgsfield generate create text2image_soul_v2 --custom_reference_id $soulId --prompt $p.prompt --aspect_ratio "9:16" --wait --json 2>&1
  $jsonText = ($raw | Out-String).Trim()
  try {
    $obj = $jsonText | ConvertFrom-Json
    $url = $obj[0].result_url
  } catch {
    $url = $null
  }
  if ($url) {
    Write-Output ("  url: " + $url)
    Invoke-WebRequest -Uri $url -OutFile $outFile -UseBasicParsing | Out-Null
    Write-Output ("  saved: " + $outFile)
  } else {
    Write-Output ("  ERROR for " + $p.name)
    Write-Output $jsonText
  }
}

Write-Output ("DONE. Output dir: " + $outDir)
