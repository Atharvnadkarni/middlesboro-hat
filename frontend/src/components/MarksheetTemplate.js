import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MarksheetTemplate = () => {
  const {
    class: classe,
    exam,
    format,
    marksheet: { rows, columns },
  } = useSelector((state) => state);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const profileStr = localStorage.getItem("profile");
    setProfile(JSON.parse(profileStr));
  }, []);
  return (
    <table border="1">
      <thead>
        <tr>
          <td colSpan={4}>Vidya Vikas Academy</td>
        </tr>
        <tr>
          <td colSpan={4}>{JSON.stringify(format)} {exam} Marksheet</td>
        </tr>
      </thead>
    </table>
  );
};
export default MarksheetTemplate;
