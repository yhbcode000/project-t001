const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const VIDEO = path.resolve(__dirname, '../public/pvi/360_orbit_final.mp4')
const META = path.resolve(__dirname, '../public/pvi/360_orbit_final_calibration_metadata.json')
const OUT_DIR = path.resolve(__dirname, '../public/pvi/frames')
const FRAME_COUNT = 120

const metadata = JSON.parse(fs.readFileSync(META, 'utf-8'))
const totalFrames = metadata.frames.length
const step = Math.max(1, Math.floor(totalFrames / FRAME_COUNT))

fs.mkdirSync(OUT_DIR, { recursive: true })

for (let i = 0; i < FRAME_COUNT; i++) {
  const frameIndex = Math.min(i * step, totalFrames - 1)
  const time = metadata.frames[frameIndex].time_seconds
  const outFile = path.join(OUT_DIR, `${String(i).padStart(4, '0')}.webp`)
  if (fs.existsSync(outFile)) continue
  execSync(
    `ffmpeg -ss ${time} -i "${VIDEO}" -frames:v 1 -q:v 80 "${outFile}"`,
    { stdio: 'pipe' }
  )
  process.stdout.write(`\r${i + 1}/${FRAME_COUNT}`)
}

console.log(`\nDone. ${FRAME_COUNT} frames in ${OUT_DIR}`)
