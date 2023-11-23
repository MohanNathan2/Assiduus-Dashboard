import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../App.css';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

function Content() {
  const [dataArr, setDataArr] = useState([]);
  const [initialDates, setInitialDates] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const allMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://data.covid19india.org/v4/min/timeseries.min.json`);
      setDataArr(response.data.AN);
      const dates = Object.keys(response.data.AN.dates).reverse().slice(0, 10);
      setInitialDates(dates);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    const startDate = moment(dateStrings[0]);
    const endDate = moment(dateStrings[1]);
    const datesArray = [];
    for (let m = startDate; m.isSameOrBefore(endDate); m.add(1, 'days')) {
      datesArray.push(m.format('YYYY-MM-DD'));
    }
    setSelectedDateRange(datesArray);
  };

  const getInvoicesData = () => {
    return [3000, 5000, 8000, 2000, 6000, 4000, 7000,5500,4750,5555,7542,3000]; 
  };

  const getTotalCashFlowData = () => {
    return [
      { inflow: 500, outflow: 200 },
      { inflow: 800, outflow: 300 },
      { inflow: 700, outflow: 400 },
      { inflow: 900, outflow: 100 },
      { inflow: 600, outflow: 200 },
      { inflow: 1000, outflow: 300 },
      { inflow: 1200, outflow: 500 },
      { inflow: 500, outflow: 200 },
      { inflow: 800, outflow: 300 },
      { inflow: 700, outflow: 400 },
      { inflow: 1000, outflow: 300 },
      { inflow: 1200, outflow: 500 },
    ];
  };

  const getAccountWatchlistData = () => {
    return {
      sales: { thisMonth: 1000, ytd: 5000 },
      advertising: { thisMonth: 800, ytd: 4000 },
      inventory: { thisMonth: 1200, ytd: 6000 },
      entertainment: { thisMonth: 600, ytd: 3000 },
      product: { thisMonth: 1500, ytd: 7500 },
    };
  };

  const renderLineChart = () => {
    if (!dataArr) {
      return null;
    }

    const dates = selectedDateRange.length > 0 ? selectedDateRange : initialDates;

    const chartData = dates.map((date) => {
      const dataForDate = dataArr.dates[date];
      return {
        date,
        delta: dataForDate?.delta?.confirmed || 0,
        delta7: dataForDate?.delta7?.confirmed || 0,
      };
    });

    return (
      <LineChart width={500} height={220} data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="delta" stroke="#8884d8" />
        <Line type="monotone" dataKey="delta7" stroke="#82ca9d" />
      </LineChart>
    );
  };

  return (
    <div className="content">
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card style={{ height: '280px' }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ display: 'flex', fontSize: 'large', justifyContent: 'space-between' }}>
                  Checking account
                  <DatePicker.RangePicker  onChange={handleDateRangeChange} />
                </Typography>

                <Divider />
                {renderLineChart()}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card style={{ height: '280px' }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ display: 'flex', fontSize: 'large' , justifyContent:'space-between'}}>
                  Invoices owed to You
                  <label htmlFor="fileInput" className='fileInput'>New sales invoice</label>
                  <input type="file" id="fileInput" style={{ display: 'none' }} />
                </Typography>
                <Divider />
                <BarChart
                  xAxis={[
                    {
                      scaleType: 'band',
                      data: allMonths,
                    },
                  ]}
                  series={[
                    {
                      data: getInvoicesData(),
                      stack: 'A',
                    },
                  ]}
                  width={575}
                  height={250}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card style={{ height: '280px' }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ display: 'flex', fontSize: 'large' }}>
                  Total cash flow
                </Typography>
                <Divider />
                <BarChart
                  xAxis={[
                    {
                      scaleType: 'band',
                      data: allMonths,
                    },
                  ]}
                  series={[
                    {
                      data: getTotalCashFlowData().map(item => item.inflow),
                      stack: 'Inflow',
                      label: 'In',
                    },
                    {
                      data: getTotalCashFlowData().map(item => item.inflow),
                      stack: 'Inflow',
                    },
                    {
                      data: getTotalCashFlowData().map(item => item.outflow),
                      stack: 'Outflow',
                      label: 'Out',
                    },
                    {
                      data: getTotalCashFlowData().map(item => item.outflow),
                      stack: 'Outflow',
                    },
                  ]}
                  width={650}
                  height={250}
                  sx={{
                    '.MuiBarElement-root': {
                      fill: (series, index) => {
                        const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF5733'];
                        return colors[index % colors.length];
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card style={{ height: '280px' }}>
              <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h5" component="div" style={{ display: 'flex', fontSize: 'large' }}>
                  Account Watchlist
                </Typography>
                <Divider />
                <TableContainer component={Paper} style={{ flexGrow: 1, overflow: 'auto' }}>
                  <Table style={{ border: 'none' }}>
                    <TableBody>
                      <TableRow style={{ border: 'none' }}>
                        <TableCell style={{ border: 'none', color: '#989898' }}>Account</TableCell>
                        <TableCell style={{ border: 'none', color: '#989898' }}>This Month</TableCell>
                        <TableCell style={{ border: 'none', color: '#989898' }}>YTD</TableCell>
                      </TableRow>
                      {Object.keys(getAccountWatchlistData()).map(account => (
                        <TableRow key={account} style={{ border: 'none' }}>
                          <TableCell style={{ border: 'none' }}>{account}</TableCell>
                          <TableCell style={{ border: 'none' }}>{getAccountWatchlistData()[account].thisMonth}</TableCell>
                          <TableCell style={{ border: 'none' }}>{getAccountWatchlistData()[account].ytd}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Content;
