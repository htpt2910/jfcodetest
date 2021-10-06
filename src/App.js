/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import Item from "./components/item";
import {
  Label,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from "recharts";
import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import useCheckboxes from "./components/checkboxes";


function App() {

  var result, val;
  const years = ['1970', '1980', '1990', '2000', '2010', '2020', '2030'];
  var values = [];
  var arr = [];
  var datas = [];
  // var datas = [{
  //   name : '',
  //   populations : []
  // }]

  async function fetchData(prefCode, index) {
    return fetch( 
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
          values = [];
          val = res.data.result.data[0].data;
          result = val.filter((element, index) => index >= 2 && index % 2 === 0 && index <= 14);
          result.forEach(item => values.push(item.value));
          for(let j = 0; j < years.length; j++) {
              arr[j][index] = values[j];
          }
        })
    );
  }

  const checkboxes = useCheckboxes();

  const [prefCodes, setPrefCodes] = useState([]);
  var prefCodesArray = [];

  const [checkedState, setCheckedState] = useState(
    new Array(checkboxes.length).fill(false)
  );

  const handleChange = (position) => {
  
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position ? !item : item
    });

    setCheckedState(updatedCheckedState);
    prefCodesArray = [];
    var i = 0;
    updatedCheckedState.map((item, index) => {
      i+=1;
      return item ? prefCodesArray[i] = index + 1 : console.log("nothing")
    }) 
    prefCodesArray = prefCodesArray.filter(e=>e)
    
    setPrefCodes([...prefCodesArray]);
  }

  useEffect(() => {
    async function temptemp(){
      for(var i=0; i < prefCodes.length; i++){
        await fetchData(prefCodes[i], i);
      }

      console.log(arr);
      for (let x = 0; x < years.length; x++) {
          datas.push({
            name : years[x],
            populations : arr[x]
          })
      }
      // datas.shift()
      // datas[0].name = '' 
      setData([...datas])
    }
    temptemp();

  }, [prefCodes]); 
  for (let i = 0; i < years.length; i++) {
    for (let j = 0; j < prefCodes.length; j++) {
      arr[i] = [];
    }
  }

  const [data, setData] = useState([{
    name : '',
    populations : []
  }])

  return (
    <div className="App">
      <header>
        <p className="title">1980年から現在までの地域別の人口構造図</p>
      </header>
      <hr />
      <p className="caption">都道府県</p>
      <div className="list-city-name">
        <div>
          {checkboxes.map((item, index) => {
            return <Item key={index} id={index} checked={checkedState[index]} cityName={item.name} onChange={() => {
              handleChange(index);
            }}/>
          })}
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
              {/* <Label value="Pages of my website" offset={0} position="insideBottom" /> */}
            {/* </XAxis> */}
            <YAxis type="number" domain={[0, 6000000]}/>
            <Tooltip />
            <Legend />
            
            {data.map(dt => {
              if (typeof(dt.populations) !== "undefined"){
                console.log(data);
                return dt.populations.map( (value, index) =>  <Line type="monotone"  dataKey={value} stroke={"#" + Math.floor(Math.random()*16777215).toString(16)} activeDot={{ r: 8 }} />)
              }
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
