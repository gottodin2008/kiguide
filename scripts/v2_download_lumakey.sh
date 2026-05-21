#!/bin/bash
set -e
cd "$(dirname "$0")/.."
OUT=public/lara/videos
TMP=public/lara/videos/_raw_v2
mkdir -p "$OUT" "$TMP"

declare -A urls=(
  [anf_ch2]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_112125_c6dca4e0-0eeb-44ed-92ca-e8a4ebf2f7fd.mp4"
  [anf_ch3]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_112136_63e78b96-dd9e-4604-b624-d5e2c55acf65.mp4"
  [anf_ch4]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_112149_efed3280-3a88-4a8e-a4c6-4a0c02f6c469.mp4"
  [anf_ch5]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_112532_3a82c228-aeea-4822-9916-cccd26a68a63.mp4"
  [anf_ch6]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_112549_ec25f881-7592-4312-b4ae-267f0f314e1e.mp4"
  [anf_ch7]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_112559_10c3054e-77e0-4b7c-8e9c-38b8e3f80cd5.mp4"
  [fort_ch1]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_112612_0541d7a2-3659-47b1-b0cf-5820ce88b08b.mp4"
  [fort_ch2]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_112955_e0732e89-6432-4eea-91e7-e46323820921.mp4"
  [fort_ch3]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_113007_0a840dfb-353c-4789-ac85-6f125f51ba3f.mp4"
  [fort_ch4]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_113019_a5b85e13-922a-440e-9952-c9eafbe810bd.mp4"
  [fort_ch5]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_113030_ea507b0d-7356-413f-844f-eab5c26c649a.mp4"
  [fort_ch6]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_113413_6f868104-2e87-47b6-b65c-576cdfa69eb1.mp4"
  [fort_ch7]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_113424_abda61c6-a4cf-4140-9ed9-114eb2364512.mp4"
  [fort_ch8]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_113435_6df52fb0-adce-4e18-82e0-3d03f8095bb7.mp4"
  [hero_welcome]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_113447_010f8ed7-6bfc-40f2-b671-74f77c518c1e.mp4"
)

for name in "${!urls[@]}"; do
  raw="$TMP/$name.mp4"
  out="$OUT/lara_$name.webm"
  echo "→ $name"
  curl -sL "${urls[$name]}" -o "$raw"
  # Strip the seedance audio (-an) since we use ElevenLabs audio in the app
  ffmpeg -loglevel error -y -i "$raw" \
    -vf "lumakey=threshold=1.0:tolerance=0.18:softness=0.10" \
    -c:v libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0 \
    -b:v 900k -an \
    "$out"
  echo "  ✓ $out"
done

echo "Done!"
