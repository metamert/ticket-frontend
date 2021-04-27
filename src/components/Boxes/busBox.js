import { BackspaceOutlined } from "@material-ui/icons";
import React from "react"




const Postcard = ({ data }) => {

const [state,setState]=React.useState(false)

  return (
    <div className={"postCard boxColor column p05  box-shadow relative space-between"}>
      <div className="postCardLive row center">
        <h2>otobüs 1</h2>
      </div>
      <div className={"postTop w100 "}>
        <div className={"topConent row center"}>
          <BackspaceOutlined style={{ width: 30 ,position:"absolute",right:20,top:20,color:"red"}}></BackspaceOutlined>
          <div className="topTextContent w100 column pl05">
            <h5 className="green-text">wifi </h5>
            
          </div>
        </div>
      </div>
      <div className="postContent">
      <h2>2+1</h2>
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
