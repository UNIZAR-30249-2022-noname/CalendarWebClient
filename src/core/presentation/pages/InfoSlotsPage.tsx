import Text from "antd/lib/typography/Text";
import { useLocation } from "react-router-dom";
import TableInfoSlots from "../../../features/infoSlots/presentation/components/TableInfoSlots";

export const InfoSlotPage = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("slot");

  return (
    <div>
      <TableInfoSlots />
      <Text>Info Slots of {name}</Text>
    </div>
  );
};
