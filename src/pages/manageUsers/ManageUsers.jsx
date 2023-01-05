import axios from "axios";
import { BASE_AUTH_URL, BASE_CAMADPTR_URL } from "../..";
import DataTable from "../../components/dataTable/DataTable";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(0);
  const sb = useSelector((state) => state.sb.option);

  const loadData = async () => {
    dispatch(uiActions.startLoad());
    const resp = await axios.get(`${BASE_AUTH_URL}/getUser?userType=staff`);
    for (let el of resp.data) {
      const resp2 = await axios.get(
        `${BASE_CAMADPTR_URL}/getGroupsForUser?userId=${el.id}`
      );

      let groupsList = "";
      resp2.data.map(
        (el, i) =>
          (groupsList =
            i === 0 ? groupsList.concat(el) : groupsList.concat(`, ${el}`))
      );
      el.groups = groupsList;
    }
    resp.data = resp.data.map((el) => {
      delete el.user_id;
      delete el.created_at;
      return el;
    });

    dispatch(uiActions.stopLoad());
    setData(resp.data);
  };

  useEffect(() => {
    loadData();
  }, [sb]);

  return (
    <div>{data && <DataTable data={data} loadData={loadData} sb={sb} />}</div>
  );
};

export default ManageUsers;
