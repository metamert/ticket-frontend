import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const getTime = (date) => {
  console.log(new Date(date).getUTCHours());
  return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
};

const createTime = (datas) => {
  let month_ago = [];
  let month = [];
  
  var d = new Date();
  let this_month = d.getMonth();
  d.setMonth(d.getMonth() - 1);
  


  
  datas &&
    datas.map((item) => {
      if (new Date(item.createdAt).getMonth()=== this_month) month.push(item);

console.log(month)
      if (new Date(item.createdAt).getMonth() === new Date(d).getMonth())
        month_ago.push(item);
    });

  return [
    createData("geçen ay", month_ago.length),
  
    createData("bu ay", month.length),
  ];
};

export default function Chart({ info }) {
  const theme = useTheme();
  console.log(info)
  const data = info ? createTime(info.data) : [];
  return (
    <React.Fragment>
      <Title>Kullanıcı sayısı</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <Tooltip />
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis dataKey="amount" stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
             kullanıcı
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#82ca9d" dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
