import React from "react";

//TODO sacar un tipo de datos con la Key e InfoSlots
export type InfoSlots = {
  hour: number;
  occupied: boolean;
  person?: String;
};

export type InfoSlotsKey = {
  key: React.Key;
  infoSlot: InfoSlots;
};
