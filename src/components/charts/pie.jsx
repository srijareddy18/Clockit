import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ["#8884d8", "#D6D470", "#9CD884", "#D584D8", "#D88484"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};



export const CustomPie = (props) => {

    const [globaldata, setGlobalData] = useState([]);

    const getData = (data, tasks, filter) => {
        if (!data || !tasks) {
            return [];
        }
        const res = [];
        tasks.forEach((task) => {
            const ele = { name: task, value: 0 }
            data.filter(
                (e) =>
                    e.date >= filter.startFilter &&
                    e.date <= filter.endFilter
            ).forEach((e) => {
                if (e[task]) {
                    ele.value += e[task];
                }
            })
            res.push(ele)
        })
        setGlobalData(res);
    }

    useEffect(() => {
        getData(props.data, props.tasks, props.filter);
    }, [props.data, props.tasks, props.filter])

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={globaldata}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                fill="#8884d8"
                dataKey="value"
            >
                {globaldata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    );

}
