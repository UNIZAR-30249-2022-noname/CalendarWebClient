const url = {
  baseURL1: "https://jsonplaceholder.typicode.com",
};

const httpServices = {
  degreeAvailableHours: url.baseURL1 + "/availableHours",
  entries: url.baseURL1 + "/newEntry",
};
export { url, httpServices };
