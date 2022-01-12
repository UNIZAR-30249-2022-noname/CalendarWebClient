const url = {
  baseURL1: "http://localhost:8080",
};

const httpServices = {
  degreeAvailableHours: url.baseURL1 + "/availableHours",
  entries: url.baseURL1 + "/updateScheduler",
  getEntries: url.baseURL1 + "/getEntries",
  listDegrees: url.baseURL1 + "/listDegrees",
  uploadData: url.baseURL1 +"/updateByCSV",
};
export { url, httpServices };
