import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const consumerAttitudesData = [
  { year: "2020", ecoInterest: 28, willingToPay: 45 },
  { year: "2021", ecoInterest: 34.4, willingToPay: 52 },
  { year: "2022", ecoInterest: 38, willingToPay: 48 },
  { year: "2023", ecoInterest: 42, willingToPay: 44 },
  { year: "2024", ecoInterest: 45, willingToPay: 41 },
  { year: "2025", ecoInterest: 48, willingToPay: 38 }
];

const premiumWillingnessData = [
  { category: "No Premium", percentage: 43 },
  { category: "Up to 10%", percentage: 31 },
  { category: "Up to 25%", percentage: 26 }
];

const marketGrowthData = [
  { year: "2020", value: 1.2 },
  { year: "2021", value: 1.28 },
  { year: "2022", value: 1.35 },
  { year: "2023", value: 1.42 },
  { year: "2024", value: 1.52 },
  { year: "2025", value: 1.65 },
  { year: "2030", value: 2.10 },
  { year: "2034", value: 2.52 }
];

const barriersData = [
  { barrier: "Cost/Affordability", percentage: 53 },
  { barrier: "Quality Concerns", percentage: 38 },
  { barrier: "Availability", percentage: 32 },
  { barrier: "Lack of Information", percentage: 28 }
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--muted))"];

export const EcoConsumerChart = () => {
  return (
    <Card className="w-full bg-background/60 backdrop-blur-sm border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl text-foreground">UK Consumer Eco-Friendly Interest (2020-2025)</CardTitle>
        <CardDescription className="text-lg text-foreground/80">
          Data-driven insights into sustainability attitudes and market growth
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="attitudes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="attitudes">Attitudes</TabsTrigger>
            <TabsTrigger value="premium">Premium Willingness</TabsTrigger>
            <TabsTrigger value="growth">Market Growth</TabsTrigger>
            <TabsTrigger value="barriers">Barriers</TabsTrigger>
          </TabsList>

          <TabsContent value="attitudes" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={consumerAttitudesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="ecoInterest" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Eco Interest (%)"
                    dot={{ fill: "hsl(var(--primary))", r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="willingToPay" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={3}
                    name="Willing to Pay Premium (%)"
                    dot={{ fill: "hsl(var(--secondary))", r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="font-semibold text-foreground">📈 Key Finding</p>
                <p className="text-foreground/80">34.4% regularly purchase eco-friendly products (2021)</p>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="font-semibold text-foreground">⚠️ Challenge</p>
                <p className="text-foreground/80">Premium willingness declining due to cost-of-living pressures</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="premium" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={premiumWillingnessData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={120}
                    fill="hsl(var(--primary))"
                    dataKey="percentage"
                  >
                    {premiumWillingnessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="font-semibold text-foreground">🎯 Target Market</p>
                <p className="text-foreground/80">57% willing to pay up to 10% premium for sustainable products</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="font-semibold text-foreground">💰 Premium Segment</p>
                <p className="text-foreground/80">26% willing to pay up to 25% more for eco-friendly options</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="growth" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" label={{ value: 'USD Billion', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    name="Market Value (USD Billion)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="font-semibold text-foreground">📊 Current Market</p>
                <p className="text-foreground/80">USD 1.52 Billion (2024)</p>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="font-semibold text-foreground">🚀 Projected Growth</p>
                <p className="text-foreground/80">USD 2.52 Billion by 2034 (5.2% CAGR)</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="barriers" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barriersData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--foreground))" />
                  <YAxis dataKey="barrier" type="category" stroke="hsl(var(--foreground))" width={150} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Bar 
                    dataKey="percentage" 
                    fill="hsl(var(--destructive))" 
                    name="Consumer Concerns (%)"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-destructive/10 rounded-lg">
                <p className="font-semibold text-foreground">🎯 Lulu's Solution</p>
                <p className="text-foreground/80">Affordable eco-friendly toilet paper addresses the #1 barrier: cost</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="font-semibold text-foreground">💡 Key Insight</p>
                <p className="text-foreground/80">53% would adopt sustainable lifestyle if more affordable</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-bold text-foreground mb-3 text-lg">Additional UK Market Insights:</h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>60% of Britons agree climate change is the biggest threat (70% for Gen Z)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>82% consider toilet paper an essential household item</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>80% prefer eco-friendly packaging, but only 27% willing to pay €3 extra</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Global eco-friendly toilet paper sales grew 31% from 2022 to 2023</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
