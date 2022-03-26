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
  name: string | null;
  date: string;
};

export type SlotData = {
  name: string | null;
  capacity: number;
  description: string;
  building: string;
  floor: string;
  type: string;
};

export type AllInfoSlot = {
  slotData: SlotData;
  infoSlots: InfoSlots[];
};
