import React from "react";

//TODO sacar un tipo de datos con la Key e InfoSlots
export type InfoSlots = {
  key: React.Key;
  hour: number;
  occupied: boolean;
  person?: String;
};
