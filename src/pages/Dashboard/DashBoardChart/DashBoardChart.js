import React from 'react';
import {FileDoneOutlined} from '@ant-design/icons';
import { Card } from 'antd';
import { Area } from '@ant-design/plots'

const DashBoardChart = () => {

    const data = [
        { year: '2023-09', value: 3, type: 'Lượt thăm khám' },
        { year: '2023-10', value: 4, type: 'Lượt thăm khám' },
        { year: '2023-11', value: 3.5, type: 'Lượt thăm khám' },
        { year: '2023-12', value: 5, type: 'Lượt thăm khám' },
        { year: '2024-01', value: 4.9, type: 'Lượt thăm khám' },
        { year: '2024-02', value: 6, type: 'Lượt thăm khám' },
        { year: '2024-03', value: 7, type: 'Lượt thăm khám' },
        { year: '2024-04', value: 9, type: 'Lượt thăm khám' },
        { year: '2024-05', value: 13, type: 'Lượt thăm khám' },
        { year: '2023-09', value: 2, type: 'Lượt đăng ký bệnh nhân mới' },
        { year: '2023-10', value: 3, type: 'Lượt đăng ký bệnh nhân mới' },
        { year: '2023-11', value: 2.5, type: 'Lượt đăng ký bệnh nhân mới' },
        { year: '2023-12', value: 4, type: 'Lượt đăng ký bệnh nhân mới' },
        { year: '2024-01', value: 3.9, type: 'Lượt đăng ký bệnh nhân mới' },
        { year: '2024-02', value: 5, type: 'Lượt đăng ký bệnh nhân mới' },
        { year: '2024-03', value: 6, type: 'Lượt đăng ký bệnh nhân mới' },
        { year: '2024-04', value: 8, type: 'Lượt đăng ký bệnh nhân mới' },
        { year: '2024-05', value: 12, type: 'Lượt đăng ký bệnh nhân mới' }
    ];
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        isStack: false,
        seriesField: 'type',
        animation: true,
        startOnZero: true,
        smooth: true,
        height: 325
    };

    return (
        <Card
            style={{ height: '100%' }}
            className='mt-3'
            title={
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <FileDoneOutlined />
                    <h6 className='mt-2'>Numbers</h6>
                </div>
            }
        >
            <Area {...config} />
        </Card>
    )
}

export default DashBoardChart;
