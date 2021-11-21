const url = {
  baseURL1: "https://jsonplaceholder.typicode.com",
};

const httpServices = {
  degreeAvailableHours: url.baseURL1 + "/availableHours",
  listDegrees: url.baseURL1 + "/listDegrees/"
};
export { url, httpServices };
