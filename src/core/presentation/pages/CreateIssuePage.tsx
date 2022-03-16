import Text from "antd/lib/typography/Text";
import { useLocation } from "react-router-dom";

export const CreateIssuePage = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('slot');

  return(
    <Text>Create Issue on {name}</Text>
  );
};
