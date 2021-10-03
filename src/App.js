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
function App() {
  function fetchData(prefCode, cityCode) {
    // GET request using fetch inside useEffect React hook

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
          const arr = []
          var val = res.data.result.data[0];
          var len = val.data.length;
          const kekka = val.data.map((element) => element.value);
          console.log(kekka);
          console.log(res.data, res.status);
          // setValue(res.data.result.data[0].label);
        })
    );
  }

  // function execute(state){ //TODO
  //   for ... in state():
  //     if (state[i] == checked){
  //       fetchData(i);
  //     }
  // }

  // const [value, setValue] = useState(null);
  // const [state, setState] = useState(...); // TODO 
  // useEffect(() => execute(curSate), []);

  const cityNames = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ];

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
    },
    {
      name: "2000",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "2010",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "2020",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "年度",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
  ];
  return (
    <div className="App">
      <header>
        <p className="title">1980年から現在までの地域別の人口構造図</p>
      </header>
      <hr />
      <p className="caption">都道府県</p>
      <div className="list-city-name">
        {cityNames.map((city) => (
          <Item cityName={city} />
        ))}
      </div>
      <div className="chart">
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
      </div>
      <div>{/* Total react packages: {value} */}</div>
    </div>
  );
}

export default App;
