import Text from "antd/lib/typography/Text";
import { useLocation } from "react-router-dom";

export const InfoSlotPage = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('slot');

  return(
    <Text>Info Slots of {name}</Text>
  );
};
