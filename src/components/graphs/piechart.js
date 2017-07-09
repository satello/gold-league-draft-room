import React, {Component} from 'react';

import {
    AreaChart, Area,
    PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Sector,
    ResponsiveContainer
} from 'recharts';

// Pie Chart data example
// --------------------
// const data = [
//     {name: 'Direct', value: 23}, {name: 'Referral', value: 8},
//     {name: 'Organic', value: 44}, {name: 'Social', value: 25}
// ];

// FIXME 5 colors right now
const trafficSourceColors = ['#448AFF', '#00E676', '#7C4DFF', '#40C4FF', '#ffc658'];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent} = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={12}>
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

class InteractivePieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {activeIndex: 0}
    }
    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    }

    render() {
        return (
            <ResponsiveContainer>
                <PieChart onMouseEnter={this.onPieEnter}>
                    <Pie
                        data={this.props.data}
                        activeIndex={this.state.activeIndex} activeShape={renderActiveShape}
                        outerRadius={90}
                        innerRadius={70} paddingAngle={4}>
                        { this.props.data.map((entry, index) => <Cell fill={trafficSourceColors[index]} key={index}/>) }
                    </Pie>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

export default InteractivePieChart;
