import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const augustData = [
  {"Employee Name": "ORDERS, ONLINE", "Order Count": 662, "Order Total": "$41,978.03", "Avg Order Value": 63.41, "Avg Turn Time": "0:03", "Non-Cash Tip %": "9.9%", "Item Voids": 8, "Void Amount": 213.00},
  {"Employee Name": "Fujimoto, Carey-Anne", "Order Count": 604, "Order Total": "$31,889.74", "Avg Order Value": 52.80, "Avg Turn Time": "20:41", "Non-Cash Tip %": "12.2%", "Item Voids": 12, "Void Amount": 280.00},
  {"Employee Name": "Rongen, Hannah", "Order Count": 542, "Order Total": "$39,421.95", "Avg Order Value": 72.73, "Avg Turn Time": "41:52", "Non-Cash Tip %": "19.5%", "Item Voids": 9, "Void Amount": 87.95},
  {"Employee Name": "Walker, Hailey", "Order Count": 354, "Order Total": "$22,743.28", "Avg Order Value": 64.25, "Avg Turn Time": "38:47", "Non-Cash Tip %": "16.8%", "Item Voids": 5, "Void Amount": 133.00},
  {"Employee Name": "Moura, Taryn", "Order Count": 144, "Order Total": "$8,899.68", "Avg Order Value": 61.80, "Avg Turn Time": "29:50", "Non-Cash Tip %": "17.2%", "Item Voids": 0, "Void Amount": 0.00},
  {"Employee Name": "Diaz, Cheryl", "Order Count": 142, "Order Total": "$6,806.07", "Avg Order Value": 47.93, "Avg Turn Time": "50:20", "Non-Cash Tip %": "20.4%", "Item Voids": 1, "Void Amount": 10.00},
  {"Employee Name": "Kaneaiakala, Makoa", "Order Count": 126, "Order Total": "$8,404.13", "Avg Order Value": 66.70, "Avg Turn Time": "32:25", "Non-Cash Tip %": "18.5%", "Item Voids": 0, "Void Amount": 0.00},
  {"Employee Name": "Quatrale, Andrew", "Order Count": 119, "Order Total": "$10,370.63", "Avg Order Value": 87.15, "Avg Turn Time": "46:03", "Non-Cash Tip %": "19.3%", "Item Voids": 2, "Void Amount": 29.00},
  {"Employee Name": "Estacio, Nicole", "Order Count": 112, "Order Total": "$9,104.91", "Avg Order Value": 81.29, "Avg Turn Time": "43:34", "Non-Cash Tip %": "19.5%", "Item Voids": 0, "Void Amount": 0.00},
  {"Employee Name": "Rissell, Warren", "Order Count": 110, "Order Total": "$4,392.13", "Avg Order Value": 39.93, "Avg Turn Time": "1:08:44", "Non-Cash Tip %": "22.0%", "Item Voids": 1, "Void Amount": 33.00},
  {"Employee Name": "Carroll, Shannon", "Order Count": 103, "Order Total": "$8,191.12", "Avg Order Value": 79.53, "Avg Turn Time": "43:25", "Non-Cash Tip %": "19.2%", "Item Voids": 5, "Void Amount": 97.00},
  {"Employee Name": "Rodriguez, Sarah", "Order Count": 99, "Order Total": "$7,704.10", "Avg Order Value": 77.82, "Avg Turn Time": "41:10", "Non-Cash Tip %": "19.1%", "Item Voids": 2, "Void Amount": 29.00},
  {"Employee Name": "Davis, Nick", "Order Count": 92, "Order Total": "$4,416.05", "Avg Order Value": 48.00, "Avg Turn Time": "52:51", "Non-Cash Tip %": "20.4%", "Item Voids": 5, "Void Amount": 79.70},
];

const julyData = [
  {"Employee Name": "ORDERS, ONLINE", "Order Count": 820, "Order Total": "$53,193.85", "Avg Order Value": 64.87, "Avg Turn Time": "3:31", "Non-Cash Tip %": "10.5%", "Item Voids": 10, "Void Amount": 189.00},
  {"Employee Name": "Fujimoto, Carey-Anne", "Order Count": 624, "Order Total": "$36,177.66", "Avg Order Value": 57.98, "Avg Turn Time": "23:57", "Non-Cash Tip %": "12.9%", "Item Voids": 20, "Void Amount": 225.00},
  {"Employee Name": "Rongen, Hannah", "Order Count": 504, "Order Total": "$37,392.73", "Avg Order Value": 74.19, "Avg Turn Time": "41:16", "Non-Cash Tip %": "19.0%", "Item Voids": 9, "Void Amount": 109.00},
  {"Employee Name": "Walker, Hailey", "Order Count": 387, "Order Total": "$27,821.72", "Avg Order Value": 71.89, "Avg Turn Time": "42:49", "Non-Cash Tip %": "18.0%", "Item Voids": 4, "Void Amount": 101.00},
  {"Employee Name": "Carroll, Shannon", "Order Count": 189, "Order Total": "$15,450.23", "Avg Order Value": 81.75, "Avg Turn Time": "47:18", "Non-Cash Tip %": "19.2%", "Item Voids": 14, "Void Amount": 179.50},
  {"Employee Name": "Kemp-Phillips, Amija", "Order Count": 186, "Order Total": "$9,752.46", "Avg Order Value": 52.43, "Avg Turn Time": "48:13", "Non-Cash Tip %": "20.2%", "Item Voids": 4, "Void Amount": 46.00},
  {"Employee Name": "Rodriguez, Sarah", "Order Count": 170, "Order Total": "$14,418.27", "Avg Order Value": 84.81, "Avg Turn Time": "45:22", "Non-Cash Tip %": "19.0%", "Item Voids": 15, "Void Amount": 331.50},
  {"Employee Name": "Estacio, Nicole", "Order Count": 141, "Order Total": "$13,667.48", "Avg Order Value": 96.93, "Avg Turn Time": "44:07", "Non-Cash Tip %": "20.4%", "Item Voids": 4, "Void Amount": 70.00},
  {"Employee Name": "Quatrale, Andrew", "Order Count": 137, "Order Total": "$12,921.11", "Avg Order Value": 94.31, "Avg Turn Time": "48:48", "Non-Cash Tip %": "19.4%", "Item Voids": 1, "Void Amount": 13.00},
  {"Employee Name": "Kaneaiakala, Makoa", "Order Count": 130, "Order Total": "$9,574.72", "Avg Order Value": 73.65, "Avg Turn Time": "34:38", "Non-Cash Tip %": "19.5%", "Item Voids": 1, "Void Amount": 10.00},
  {"Employee Name": "Rissell, Warren", "Order Count": 130, "Order Total": "$6,259.97", "Avg Order Value": 48.15, "Avg Turn Time": "1:06:24", "Non-Cash Tip %": "20.7%", "Item Voids": 1, "Void Amount": 33.00},
  {"Employee Name": "Davis, Nick", "Order Count": 75, "Order Total": "$3,546.84", "Avg Order Value": 47.29, "Avg Turn Time": "52:45", "Non-Cash Tip %": "20.8%", "Item Voids": 5, "Void Amount": 73.62},
  {"Employee Name": "Diaz, Cheryl", "Order Count": 41, "Order Total": "$2,051.12", "Avg Order Value": 50.03, "Avg Turn Time": "48:17", "Non-Cash Tip %": "20.6%", "Item Voids": 0, "Void Amount": 0.00},
];

const EmployeePerformanceDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState("orderCount");

  const parseCurrency = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return 0;
    return parseFloat((value || "").replace(/[$,]/g, '') || 0);
  };
  const parsePercentage = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return 0;
    return parseFloat((value || "").replace('%', '') || 0);
  };
  
  const parseTurnTime = (value) => {
    if (!value) return 0;
    const parts = value.split(':').map(Number);
    if (parts.length === 3) {
      // Format is HH:MM:SS
      return Math.round(parts[0] * 60 + parts[1] + parts[2] / 60);
    } else if (parts.length === 2) {
      // Format is MM:SS
      return Math.round(parts[0] + parts[1] / 60);
    }
    return 0;
  };

  const getFirstName = (fullName) => {
    if (!fullName) return "";
    if (fullName === "ORDERS, ONLINE") return "Online";
    return fullName.split(',')[1]?.trim().split(' ')[0] || "";
  };

  const processedData = useMemo(() => {
    const allEmployees = [...new Set([...augustData, ...julyData].map(e => e["Employee Name"] || ""))];
    return allEmployees.map(name => {
      const augustEmployee = augustData.find(e => e["Employee Name"] === name) || {};
      const julyEmployee = julyData.find(e => e["Employee Name"] === name) || {};
      return {
        name: getFirstName(name),
        augustOrderCount: augustEmployee["Order Count"] || 0,
        julyOrderCount: julyEmployee["Order Count"] || 0,
        augustOrderTotal: parseCurrency(augustEmployee["Order Total"]),
        julyOrderTotal: parseCurrency(julyEmployee["Order Total"]),
        augustAvgOrderValue: parseCurrency(augustEmployee["Avg Order Value"]),
        julyAvgOrderValue: parseCurrency(julyEmployee["Avg Order Value"]),
        augustNonCashTipPercentage: parsePercentage(augustEmployee["Non-Cash Tip %"]),
        julyNonCashTipPercentage: parsePercentage(julyEmployee["Non-Cash Tip %"]),
        augustTurnTime: parseTurnTime(augustEmployee["Avg Turn Time"]),
        julyTurnTime: parseTurnTime(julyEmployee["Avg Turn Time"]),
        augustItemVoids: augustEmployee["Item Voids"] || 0,
        julyItemVoids: julyEmployee["Item Voids"] || 0,
        augustVoidAmount: parseCurrency(augustEmployee["Void Amount"]),
        julyVoidAmount: parseCurrency(julyEmployee["Void Amount"]),
      };
    });
  }, []);

  const getChartData = () => {
    return processedData.map(employee => ({
      name: employee.name,
      August: employee[`august${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`],
      July: employee[`july${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`],
    }));
  };

  const formatYAxis = (value) => {
    switch(selectedMetric) {
      case 'orderTotal':
      case 'voidAmount':
        return `$${value.toFixed(0)}`;
      case 'nonCashTipPercentage':
        return `${value.toFixed(1)}%`;
      case 'turnTime':
        return `${value}m`;
      case 'avgOrderValue':
        return `$${value.toFixed(2)}`;
      case 'orderCount':
      case 'itemVoids':
        return value.toFixed(0);
      default:
        return value.toFixed(2);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Server Performance Dashboard</h1>
      
      <div>
        <label htmlFor="metric-select" className="block mb-2">Select Metric:</label>
        <select 
          id="metric-select"
          value={selectedMetric} 
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="orderCount">Order Count</option>
          <option value="orderTotal">Order Total</option>
          <option value="avgOrderValue">Average Order Value</option>
          <option value="nonCashTipPercentage">Non-Cash Tip Percentage</option>
          <option value="turnTime">Turn Time</option>
          <option value="itemVoids">Item Voids</option>
          <option value="voidAmount">Void Amount</option>
        </select>
      </div>

      <div style={{ height: '400px', overflowX: 'auto' }}>
        <div style={{ width: `${Math.max(processedData.length * 60, 800)}px`, height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={80} />
              <YAxis 
                tickFormatter={formatYAxis} 
                domain={[0, 'auto']}
              />
              <Tooltip 
                formatter={(value, name, props) => {
                  return [formatYAxis(value), name];
                }}
              />
              <Legend />
              <Bar dataKey="August" fill="#8884d8" />
              <Bar dataKey="July" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EmployeePerformanceDashboard;