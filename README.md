# Arcot UCB static demonstration

This project is a static, responsive banking website built with HTML, CSS, vanilla JavaScript and JSON data. It has no build step, server-side code or banking integrations. All rates, branch information and contact details are clearly marked as unverified placeholders.

## Run locally

Because browsers restrict JSON `fetch()` on `file://` pages, serve this folder with any static file server. For example, if Python is installed, run `python -m http.server 8000` in this directory and visit `http://localhost:8000/`.

## Content data

Edit the JSON files in `data/` to update the English/Tamil copy, product details, placeholder rates, notices and branch information. No actual account opening, sign-in, transfers, payments or balance access are implemented.
