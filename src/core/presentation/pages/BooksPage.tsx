import { Typography } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import BookTable from "../../../features/books/presentation/components/BookTable";

export const BookPage = () => {
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
    <BookTable />
    </div>
    </div>
  );
 
};
