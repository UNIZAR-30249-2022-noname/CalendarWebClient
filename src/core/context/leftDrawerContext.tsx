const setVisibility = (visibleDrawer: boolean) => {
  localStorage.setItem("leftDrawerState", visibleDrawer ? "opened" : "closed");
};

const getVisibility = (): boolean => {
  return !(localStorage.getItem("leftDrawerState") === "closed");
};

export const leftDrawerContext = {
  setVisibility,
  getVisibility,
};
