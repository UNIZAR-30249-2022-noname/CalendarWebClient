import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";
import { useState, useEffect, Key } from "react";
import { searchSlotsService } from "../../../../slots/domain/services/SearchSlots.service";
import { SlotsFilterForm } from "../../../../slots/domain/models/SlotsFilterForm";
import { Edifcio } from "../../../../slots/domain/models/Slots";

const { Option } = Select;

const Edificios: Edifcio[] = [
  {
    name: "Ada Byron",
    floors: [
      "Sótano",
      "Baja",
      "Primera",
      "Segunda",
      "Tercera",
      "Cuarta",
      "Quinta",
    ],
  },
  {
    name: "Torres Quevedo",
    floors: ["Sótano", "Baja", "Primera", "Segunda", "Tercera"],
  },
  {
    name: "Betancourt",
    floors: ["Sótano", "Baja", "Primera", "Segunda", "Tercera"],
  },
];

type Props = {
  hour: string;
};

type AuxSlot = {
  id: String;
  name: String;
};

export const RoomSelector = ({ hour }: Props) => {
  const [edificio, setEdificio] = useState<Edifcio>(Edificios[0]);
  const [floor, setFloor] = useState(Edificios[0].floors[2]);
  const [roomList, setRoomList] = useState<AuxSlot[]>([{ id: "1", name: "1" }]);

  const menu = roomList.map((room, i) => (
    <Option
      key={i}
      children={<Text>{room.name}</Text>}
      value={room.id as Key}
    />
  ));

  const loadData = async () => {
    console.log(edificio, floor);
    const params: SlotsFilterForm = {
      //day: formDate ,
      //hour:formHour,
      floor: floor,
      capacity: 0,
      building: edificio.name,
    };
    const slots = await searchSlotsService.filterBy(params);
    if (!slots.isError) {
      var slotvalue = slots.value;
      var auxslots: AuxSlot[] = [];
      for (var i in slotvalue) {
        if (slotvalue[i].kind == "AULA") {
          var auxslot: AuxSlot = {
            id: slotvalue[i].id,
            name: slotvalue[i].name,
          };
          auxslots.push(auxslot);
          console.log(auxslots);
        }
      }
      setRoomList(auxslots);
    }

    /*
    if (slots.isError) message.error("Error al obtener las reservas");
    else {
      await delay(500);
      message.success({ content: "Datos actualizados", key, duration: 1 });
      setRoomList(slots);
    }*/
  };

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    loadData();
  }, []);

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    loadData();
  }, [floor, edificio, hour]);

  return (
    <div>
      <Text>Edificio y planta: </Text>
      <div style={{ alignItems: "center", paddingLeft: "18%" }}>
        <Select
          defaultValue={edificio.name}
          onChange={(newEdificio) => {
            const newState = Edificios.filter(function (e) {
              return e.name == newEdificio;
            });
            setEdificio(newState[0]);
          }}
        >
          {Edificios.map((edificio) => (
            <Select.Option key={edificio.name} value={edificio.name}>
              {edificio.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          defaultValue={edificio.floors[1]}
          onChange={(newfloor) => {
            console.log(newfloor);
            setFloor(newfloor);
          }}
        >
          {edificio.floors.map((floor) => (
            <Select.Option key={floor} value={floor}>
              {floor}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Form.Item
        name="room"
        label="Sala"
        required
        rules={[
          {
            required: true,
            message: "Elige un aula!",
          },
        ]}
      >
        <Select
          optionFilterProp="children"
          placeholder={"Elige el aula..."}
          style={{ minWidth: 110 }}
          showSearch
          filterOption={(input, option) =>
            option
              ? option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              : false
          }
        >
          {menu}
        </Select>
      </Form.Item>
    </div>
  );
};
