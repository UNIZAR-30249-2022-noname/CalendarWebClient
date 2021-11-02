import { Button } from "antd";
import { FC } from "react";

type Props = {
  loading: boolean;
  onClick: Function;
};

export const SearchDegreeInfo: FC<Props> = ({ loading, onClick }) => {
  return (
    <Button type="primary" loading={loading} onClick={(_) => onClick()}>
      Buscar
    </Button>
  );
};
