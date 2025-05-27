
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

interface MonthlyData {
  month: string;
  ingresos: number;
  gastos: number;
  ahorros: number;
}

interface MonthlyEvolutionChartProps {
  data: MonthlyData[];
}

const chartConfig = {
  ingresos: {
    label: "Ingresos",
    color: "#10b981",
  },
  gastos: {
    label: "Gastos",
    color: "#ef4444",
  },
  ahorros: {
    label: "Ahorros",
    color: "#3b82f6",
  },
};

const MonthlyEvolutionChart: React.FC<MonthlyEvolutionChartProps> = ({ data }) => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Evolución Mensual</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="ingresos" 
              stroke="var(--color-ingresos)" 
              strokeWidth={2}
              dot={{ fill: "var(--color-ingresos)" }}
            />
            <Line 
              type="monotone" 
              dataKey="gastos" 
              stroke="var(--color-gastos)" 
              strokeWidth={2}
              dot={{ fill: "var(--color-gastos)" }}
            />
            <Line 
              type="monotone" 
              dataKey="ahorros" 
              stroke="var(--color-ahorros)" 
              strokeWidth={2}
              dot={{ fill: "var(--color-ahorros)" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyEvolutionChart;
