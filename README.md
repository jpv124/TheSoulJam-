The Soul Jam Live Band — Demo website

This repository contains a small static website for "The Soul Jam Live Band". It reproduces the general layout and look of a reference site and includes a video carousel that:
- plays each video to completion before advancing to the next (listens for the 'ended' event)
- starts videos muted by default to allow autoplay where supported

Files added
- index.html
- css/styles.css
- js/carousel.js

How to run locally
1. Clone the repo
2. Serve the files using a simple HTTP server in the repo root, for example:
   python3 -m http.server 8000
   or: npx serve
3. Open http://localhost:8000

Notes
- The commit was made to the main branch as the repository's initial content per your request.
- Video sources in the demo are public sample MP4s. Replace with your own video URLs by editing index.html.
