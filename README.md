# Ember

Trevor's winter keep-active app: one workout each weekday, three daily minis, and the streak.

## Files

- `index.html`: the app (what GitHub Pages serves)
- `app.html`: the same app without the page wrapper (used for the preview)
- `manifest.webmanifest`, `sw.js`, icons: home screen install and offline support
- `google-sheet-script.gs`: the connector you paste into your Google Sheet
- `build.py`: rebuilds `index.html` from `app.html` (Claude runs this)

## Connect the Google Sheet (one time)

1. Create a new Google Sheet named **Ember Log**.
2. In the Sheet: **Extensions > Apps Script**.
3. Delete what's there, paste in all of `google-sheet-script.gs`, click **Save**.
4. Click **Deploy > New deployment**. Gear icon: **Web app**. Execute as: **Me**. Who has access: **Anyone**. Click **Deploy** and allow access.
5. Copy the **Web app URL** (ends in `/exec`).
6. In Ember: **Streak** tab > **Settings** > paste it into **Google Sheet link** > **Save**.

## Put it on your phone

1. Open the GitHub Pages address in Safari (iPhone) or Chrome (Android).
2. Share > **Add to Home Screen** (iPhone) or menu > **Install app** (Android).
