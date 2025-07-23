// Specify your Google Sheets ID
// You can find this ID in the URL of your Google Sheet like this:
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your actual Spreadsheet ID

// Specify the name of the sheet you want to access
// This is the name of the tab in your Google Sheet
const SHEET_NAME = 'Sheet1';  // Change this to your actual sheet name

// Specify the field to search by
// This is the column header you want to use for searching
// NOTE: This field should ideally be UNIQUE for each entry in your sheet
const lookupField = "الرقم القومي"; // Change this to your actual lookup field header

// Specify only the fields you want to show
// These are the fields that will be displayed in the search results
// Ensure these match the headers in your Google Sheet
const FIELDS_TO_DISPLAY = [
  "الاسم باللغة العربية",
  "الرقم القومي",
  "الجامعة",
  "المجموع الكلي",
  "Email",
  "Name in English",
  "رقم الهاتف المحمول",
  "الجنسية",
  "الصورة الشخصية",
  // add/remove fields as needed
];


function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function searchById(inputId) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const idIndex = headers.indexOf(lookupField);
  if (idIndex === -1) return null;

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idIndex]) === inputId) {
      const row = data[i];
      const result = {};
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        if (FIELDS_TO_DISPLAY.includes(header)) {
          result[header] = row[j];
        }
      }
      return result;
    }
  }
  return null;
}

