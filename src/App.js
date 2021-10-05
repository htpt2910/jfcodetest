/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import Item from "./components/item";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import useCheckboxes from "./components/checkboxes";
// import { adaptEventHandlers } from "recharts/types/util/types";


function App() {


  function fetchData(prefCode, cityCode) {
    fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          "x-api-key": "YPct0WFTK258tV2tStXrEODW5F7trpNNF0Ly8Vtq",
        },
      }
    ).then((response) =>
      response
        .json()
        .then((data) => ({
          data: data,
          status: response.status,
        }))
        .then((res) => {
          var val = res.data.result.data[0];
          const result = val.data.map((element) => element.value);
          console.log(result);
        })
    );
  }

  // function execute(state){ //TODO
  //   for(var i=0; i < state.length; i++){
  //     if (state[i] == checked){
  //       fetchData(i);
  //     }
  //   }
      
  // }

  const [isCheck, setIsCheck] = useState(false);
  const [prefCodes, setPrefCodes] = useState([]);

  const isCheckArray = [];
  function handleChange(event, index){
    setIsCheck(event.target.checked);  //TODO
    console.log(isCheck);
    // console.log(index);
    // index = index + 1;
    // console.log("is check in handler : " + isCheck)
    // if(isCheck)
    //   setPrefCodes(preCodes => [...preCodes, index]);

    // console.log(prefCodes);
  }

  // const [state, setState] = useState([]); // TODO 
  // useEffect(() => execute(prefCodes), []);

  const data = [
    {
      name: "",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "1980",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    }
  ];

  const checkboxes = useCheckboxes();

  return (
    <div className="App">
      <header>
        <p className="title">1980年から現在までの地域別の人口構造図</p>
      </header>
      <hr />
      <p className="caption">都道府県</p>
      <div className="list-city-name">
        <div>
          {checkboxes.map((item, index) => 
            <Item key={index} id={index} check={item.checked} cityName={item.name} onChange={(event) => {
              handleChange(event,index);
            }}/>
          )}
        </div>
      </div>
        {/* <div className="chart">
          <LineChart
            width={1000}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis className="year" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div> */}
        
    </div>
  );
}

export default App;
