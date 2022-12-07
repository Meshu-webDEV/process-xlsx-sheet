const xlsx = require("xlsx"); // npm module for reading Excel files
const fs = require("fs"); // Node.js file system module

function excelToJson(excelFilePath) {
  // Read the Excel file
  const workbook = xlsx.readFile(excelFilePath);
  // Get the first worksheet
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  // Convert the worksheet to an array of rows
  const rows = xlsx.utils.sheet_to_json(worksheet);
  // Group the rows by the "Outlets" column
  const groupedRows = rows.reduce((acc, row) => {
    const outlet = row["Outlets"];
    if (!acc[outlet]) {
      acc[outlet] = [];
    }
    acc[outlet].push(row);
    return acc;
  }, {});
  // Save the grouped rows as a JSON file
  fs.writeFileSync("outlets.json", JSON.stringify(groupedRows, null, 2));
}

// Example usage:
excelToJson("redbull-locations.xlsx");
