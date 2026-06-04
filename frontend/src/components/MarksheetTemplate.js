import { useSelector } from "react-redux";

const MarksheetTemplate = () => {
  const { rows, columns } = useSelector((state) => state.marksheet);
  return (
    <table border="1">
      <thead>
        <tr>
          <td>Vidya Vikas Academy</td>
        </tr>
        <tr>
          <td>Vidya Vikas Academy</td>
        </tr>
      </thead>
    </table>
  );
};
export default MarksheetTemplate;
