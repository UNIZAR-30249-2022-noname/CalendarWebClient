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

export type ReqInfoSlot = {
  id: string | null;
  date: string;
};

export type SlotData = {
  name: string | null;
  capacity: number;
  description: string;
  building: string;
  floor: string;
  kind: string;
};

export type AllInfoSlot = {
  slotData: SlotData;
  infoSlots: InfoSlots[];
};
