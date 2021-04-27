import { BackspaceOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import Login from "../../pages/login";
import Modal from "../Modal/Modal2";
import { useSelector } from "react-redux";
const Postcard = ({ data }) => {
  const [state, setState] = React.useState(false);
  const [open, setopen] = React.useState(0);
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }
  function handleSearch() {
    history.push("/koltuksec", { ...data });
  }

  const {
    arrivalIn,
    busId,
    departure,
    departureFrom,
    busType,
    id,
    price,
    tv,
    wifi,
    foodService,
  } = data;
  console.log(new Date(departure))
  return (
    <div className={"postCard boxColor column p05  box-shadow relative "}>
      <Modal
        open={open}
        cancel={() => setopen(false)}
        Content={<Login isModel={true} cancel={() => setopen(false)} />}
      />
      <div className="postCardLive row space-between">
        <h2>
          {departureFrom}-{arrivalIn}
        </h2>
        <div
          style={{
            width: 30,

            color: "red",
          }}
        >
          {new Date(departure).getHours()}:{new Date(departure).getMinutes()}
        </div>
      </div>
      <div className={"postTop w100 "}>
        <div className={"start-xs row "}>
          {wifi && <h5 className="green-text m1">wifi </h5>}
          {foodService && <h5 className="green-text m1">yemek servisi</h5>}
          {tv && <h5 className="green-text m1">tv</h5>}
        </div>
      </div>
      <div className="postContent fullw row between-xs center-xs">
        <h2 className="purplebg">{busType}</h2>
        <div
          className="blackButton"
          onClick={user ? handleSearch : () => setopen(true)}
        >
          Koltuk seç
        </div>
      </div>
    </div>
  );
};
export default Postcard;

/**7
 * 
 *     <label class="label">
        <div class="toggle">
          <input
            class="toggle-state"
            type="checkbox"
            name="check"
            value="check"
          />
          <div class="indicator">
         ASD

          </div>
        </div>
      </label>
 */
