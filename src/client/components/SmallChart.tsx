import 'chart.js/auto';
import { ReactNode } from 'react';
import { Line } from 'react-chartjs-2';

export default function SmallChart({ color, children, data } 
    : {
        color : string[],
        children: ReactNode,
        data : number[]
    }){
    let fillColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`
    let fillColor2 = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`
    let lineColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`

    return (
        <div
        className='flex flex-col justify-center items-center overflow-hidden h-12 w-12 rounded-full border border-gray-300 
        dark:border-gray-700 shadow-lg'
        >
            <div className='relative top-1/4'>
                {children}
            </div>
            <Line
            style={{
                flex: 1,
            }}
            options={{
                plugins:{
                legend: {
                    display: false
                }
                },
                scales:{
                x: {
                    display: false
                },
                y: {
                    display: false
                },
                },
                elements:{
                point: {
                    radius: 0
                }
                },
            }}
            data={{
                labels: data,
                datasets: [{
                label: 'Expenses by Month',
                data: data,
                tension: 0.4,
                fill: true,
                backgroundColor: (context) => {
                    if(!context.chart.chartArea){
                        return
                    }
                    const { ctx, chartArea: {top, bottom} } = context.chart
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom)
                    gradientBg.addColorStop(0, fillColor)
                    gradientBg.addColorStop(1, fillColor2)
                    return gradientBg
                },
                borderColor: [
                    lineColor
                ],
                borderWidth: 1
                }]
            }} />
        </div>
    )
}