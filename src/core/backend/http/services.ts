const ip = typeof(process.env.REACT_APP_GATEWAY) === 'undefined'?"localhost":process.env.REACT_APP_GATEWAY
const port ="8080"
const url = "http://"+ ip +":" +port 
const httpServices = {
  degreeAvailableHours: url + "/availableHours",
  entries: url + "/updateScheduler",
  getEntries: url + "/getEntries",
  listDegrees: url + "/listDegrees",
  uploadData: url +"/updateByCSV",
  ical:url + "/getICS",
  test: url + "/ping",
};
export { url, httpServices };
