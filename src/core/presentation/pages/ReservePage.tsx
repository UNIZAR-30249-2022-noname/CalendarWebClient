import { Typography } from "antd";
import Title from "antd/lib/typography/Title";
import ReserveTable from "../../../features/reserve/presentation/components/ReserveTable";

export const ReservePage = () => {
  return (
    <div>

    <div
    style={{
      height: "100%",
      display: "flex",
      marginTop:"20px",
      justifyContent: "center",
    }}
  >
    <Typography>
    <Title>Tus reservas</Title>
    </Typography>
    </div>
    <div
    style={{
      height: "100%",
      display: "flex",
      marginTop:"20px",
      justifyContent: "center",
    }}
  >
    <ReserveTable />
    </div>
    </div>
  );
 
};
