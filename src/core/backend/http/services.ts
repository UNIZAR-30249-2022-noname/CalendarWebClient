const url = {
  baseURL1: "http://localhost:8080",
};

const httpServices = {
  degreeAvailableHours: url.baseURL1 + "/availableHours",
  entries: url.baseURL1 + "/newEntry",
};
export { url, httpServices };
