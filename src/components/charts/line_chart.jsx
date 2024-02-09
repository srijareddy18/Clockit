import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function TaskLineChart(props) {
    const [opacity, setOpacity] = useState({});

    const colors = ["#8884d8", "#D6D470", "#9CD884", "#D584D8", "#D88484"];

    useEffect(() => {
        if (props.tasks) {
            const data = {};
            props.tasks.forEach((ele) => {
                data[ele] = 1;
            });

            setOpacity(data);
        }
    }, [props.tasks]);

    const handleMouseEnter = (o) => {
        const { dataKey } = o;
        for (const key in opacity) {
            opacity[key] = 0;
        }
        setOpacity({ ...opacity, [dataKey]: 1 });
    };

    const handleMouseLeave = (o) => {
        for (const key in opacity) {
            opacity[key] = 1;
        }
        setOpacity({ ...opacity });
    };

    return (
        <div style={{ width: "100%" }}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    width={500}
                    height={300}
                    data={props.data.filter(
                        (e) =>
                            e.date >= props.filter.startFilter &&
                            e.date <= props.filter.endFilter
                    )}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    {props.tasks &&
                        props.tasks.map((e, index) => (
                            <Line
                                key={e}
                                type="monotone"
                                dataKey={e}
                                strokeOpacity={opacity[e] ?? 1}
                                stroke={colors[index]}
                            />
                        ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

TaskLineChart.propTypes = {};

export default TaskLineChart;
