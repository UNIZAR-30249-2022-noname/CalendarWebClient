import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";
import { useState, useEffect } from "react";
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

export const RoomSelector = () => {
  const [edificio, setEdificio] = useState<Edifcio>(Edificios[0]);
  const [floor, setFloor] = useState(Edificios[0].floors[0]);
  const [roomList, setRoomList] = useState(["1", "2", "3"]);

  const menu = roomList.map((room, i) => (
    <Option key={i} children={<Text>{room}</Text>} value={room} />
  ));

  const loadData = async () => {
    console.log(edificio, floor);
    /*
    const params: SlotsFilterForm = {
      day: formDate,
      hour: formHour,
      floor: values.floor,
      capacity: values.capacity,
      building: values.building,
    };
    const slots = await searchSlotsService.filterBy();
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
            loadData();
          }}
        >
          {Edificios.map((edificio) => (
            <Select.Option key={edificio.name} value={edificio.name}>
              {edificio.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          defaultValue={edificio.floors[0]}
          onChange={(newfloor) => {
            console.log(newfloor);
            setFloor(newfloor);
            loadData();
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
