/**
 * Ember: Google Sheet connector.
 * Paste this whole file into Extensions > Apps Script in your "Ember Log" Google Sheet,
 * then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Copy the Web app URL into Ember > Streak > Settings > Google Sheet link.
 */
var SHEET_NAME = 'Log';
var HEADERS = ['Logged at', 'Date', 'Action', 'Entry ID', 'Type', 'Workout', 'Status', 'Minutes', 'Miles', 'Note'];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.getRange('B:D').setNumberFormat('@'); // keep dates and IDs as plain text
  }
  return sheet;
}

// Ember sends new check-offs, swaps and undos here.
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    var rows = (data.rows || []).filter(function (r) { return Array.isArray(r) && r.length === HEADERS.length; });
    if (rows.length) {
      var sheet = getSheet_();
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length).setValues(rows);
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true, added: rows.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Ember reads everything back from here when you tap "Restore from Sheet".
function doGet() {
  var sheet = getSheet_();
  var last = sheet.getLastRow();
  var rows = last > 1 ? sheet.getRange(2, 1, last - 1, HEADERS.length).getDisplayValues() : [];
  return ContentService.createTextOutput(JSON.stringify({ rows: rows }))
    .setMimeType(ContentService.MimeType.JSON);
}
