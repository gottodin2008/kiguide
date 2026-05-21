#!/bin/bash
set -e
cd "$(dirname "$0")/.."
OUT=public/lara/videos
TMP=public/lara/videos/_raw
mkdir -p "$OUT" "$TMP"

declare -A urls=(
  [anf_ch1]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_102157_e6d7bff7-8291-4b7d-a794-44433cca9f82.mp4"
  [anf_ch2]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_102209_b3389c7c-0970-437b-ad79-ad17ae0e9ff3.mp4"
  [anf_ch3]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_102220_e151ef19-ffa7-41f9-8da0-cc5444c8a54e.mp4"
  [anf_ch4]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_102230_04770cae-47ee-457d-970e-15d5647a90ac.mp4"
  [anf_ch5]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_102631_22401f15-a486-493e-ab33-5937bc064f44.mp4"
  [anf_ch6]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_102642_135260ed-839c-4f64-b03a-0528cd846aeb.mp4"
  [anf_ch7]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_102652_e1e60c7c-3e18-44db-a90f-aafbb17cc1b2.mp4"
  [fort_ch1]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_102703_20d81936-cd20-4afb-80f0-597819bf2ac9.mp4"
  [fort_ch2]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_103044_4b6f0bb1-5775-4b56-81bb-bb2d558217bb.mp4"
  [fort_ch3]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_103055_0148f8f5-4a2b-46ff-861c-c95a4c02c4a9.mp4"
  [fort_ch4]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_103106_9748076d-97d8-4b4f-af82-38260b8ab5ec.mp4"
  [fort_ch5]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_103120_b9cc7713-bee4-4333-86b8-2afdc1515dfe.mp4"
  [fort_ch6]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_103441_77a1f0de-d043-4f77-841c-83e1253c98a0.mp4"
  [fort_ch7]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_103502_a7e2297c-6143-46ac-afac-2a534c6a0b85.mp4"
  [fort_ch8]="https://d8j0ntlcm91z4.cloudfront.net/user_345zHs0tCCRqGK0b6HK8yudLMRS/hf_20260521_103514_d76f29d2-cb73-4959-a604-f05b1976a3d8.mp4"
)

for name in "${!urls[@]}"; do
  raw="$TMP/$name.mp4"
  out="$OUT/lara_$name.webm"
  echo "→ $name"
  curl -sL "${urls[$name]}" -o "$raw"
  ffmpeg -loglevel error -y -i "$raw" \
    -vf "lumakey=threshold=1.0:tolerance=0.15:softness=0.08" \
    -c:v libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0 \
    -b:v 800k -an \
    "$out"
  echo "  ✓ $out"
done

echo "All 15 videos processed!"
