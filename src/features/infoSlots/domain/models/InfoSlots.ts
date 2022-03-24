import React from "react";

//TODO sacar un tipo de datos con la Key e InfoSlots
export type InfoSlots = {
  hour: number;
  occupied: boolean;
  person?: String;
};

export type InfoSlotsKey = {
  key: React.Key;
  hour: number;
  occupied: boolean;
  person?: String;
};

export type Reserve = {
  space: string;
  hour: number;
  date: string;
  person: string;
};

export type ReqInfoSlot = {
  name: string;
  date: string;
};
