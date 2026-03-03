/**
 * Google Apps Script: Auto-Formatting Webhook
 * Handles incoming orders, styles the sheet, and adds status dropdowns.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const timezone = Session.getScriptTimeZone();
  
  try {
    const data = JSON.parse(e.postData.contents);

    // 1. Initialize Headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = ["Order Date", "Full Name", "Email", "Phone", "Total Amount", "Items", "Status"];
      sheet.appendRow(headers);
      
      // Style the Header Row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#1f2937") // Dark Slate
                 .setFontColor("#ffffff")
                 .setFontWeight("bold")
                 .setHorizontalAlignment("center")
                 .setVerticalAlignment("middle");
      
      sheet.setFrozenRows(1); // Keep headers visible while scrolling
    }

    // 2. Format the items list
    const itemsList = data.items.map(function (item) {
      return `• ${item.name} (${item.quantity}x - ${item.price} DA)`;
    }).join("\n");

    // 3. Append the new row with "Pending" as default status
    sheet.appendRow([
      data.orderDate || Utilities.formatDate(new Date(), timezone, "yyyy-MM-dd HH:mm"),
      data.fullName || "N/A",
      data.email || "N/A",
      data.phone || "N/A",
      data.totalAmount || 0,
      itemsList,
      "Pending" 
    ]);

    // 4. Apply Instant Formatting to the new row
    const lastRow = sheet.getLastRow();
    applyRowStyles(sheet, lastRow);

    return ContentService.createTextOutput(JSON.stringify({ "success": true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "success": false, "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Helper function to style the specific row and add the dropdown
 */
function applyRowStyles(sheet, rowNum) {
  // Add Dropdown to the Status column (Column 7)
  const statusCell = sheet.getRange(rowNum, 7);
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Pending', 'Completed'], true)
    .setAllowInvalid(false)
    .build();
  statusCell.setDataValidation(rule);
  
  // Set initial "Pending" style (Yellowish background)
  statusCell.setBackground("#fef3c7").setFontColor("#92400e").setFontWeight("bold");

  // Center align all columns except the "Items" column
  sheet.getRange(rowNum, 1, 1, 5).setHorizontalAlignment("center");
  sheet.getRange(rowNum, 7).setHorizontalAlignment("center");
  
  // Vertical Alignment for the whole row
  sheet.getRange(rowNum, 1, 1, 7).setVerticalAlignment("middle");

  // Set Currency format for Column 5 (Total Amount)
  sheet.getRange(rowNum, 5).setNumberFormat('#,##0 "DA"');

  // Auto-resize columns to fit content (Optional)
  sheet.setColumnWidth(6, 350); // Keep items column wide
}

function formatExistingData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  // Format the header first
  if (lastRow >= 1) {
    const headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setBackground("#1f2937").setFontColor("#ffffff").setFontWeight("bold").setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(6, 350);
  }

  // Apply styles to every data row
  for (let i = 2; i <= lastRow; i++) {
    applyRowStyles(sheet, i); // This calls the helper function in your main code
    
    // Check if the Status cell is empty, if so, set to Pending
    const statusCell = sheet.getRange(i, 7);
    if (statusCell.getValue() === "") {
      statusCell.setValue("Pending");
    }
  }
}