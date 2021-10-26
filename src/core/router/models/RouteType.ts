import React from "react";

type RouteType = {
  name?: string;
  path: string;
  exact?: boolean;
  layout: React.ElementType;
  component: React.ElementType;
};

export default RouteType;
