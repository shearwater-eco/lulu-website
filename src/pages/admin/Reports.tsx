import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  BarChart3,
  PieChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format, subDays, startOfMonth, endOfMonth, startOfYear } from 'date-fns';
import { useInventoryValuation, useFinancialSummary } from '@/hooks/useInventory';

export default function AdminReports() {
  const [dateRange, setDateRange] = useState('30days');

  const getDateRange = () => {
    const now = new Date();
    switch (dateRange) {
      case '7days':
        return { start: subDays(now, 7), end: now };
      case '30days':
        return { start: subDays(now, 30), end: now };
      case 'thisMonth':
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case 'thisYear':
        return { start: startOfYear(now), end: now };
      default:
        return { start: subDays(now, 30), end: now };
    }
  };

  const dateRangeValues = getDateRange();
  
  // Inventory valuation
  const { data: inventoryData, isLoading: inventoryLoading } = useInventoryValuation();
  
  // Financial summary
  const { data: financialData, isLoading: financialLoading } = useFinancialSummary(dateRangeValues);

  const { data: reportData, isLoading } = useQuery({
    queryKey: ['admin-reports', dateRange],
    queryFn: async () => {
      const { start, end } = getDateRange();

      // Fetch orders in date range
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      // Fetch all products
      const { data: products } = await supabase
        .from('products')
        .select('*');

      // Fetch customers
      const { data: customers } = await supabase
        .from('customers')
        .select('*')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      // Calculate metrics
      const totalRevenue = (orders || []).reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
      const totalOrders = (orders || []).length;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const newCustomers = (customers || []).length;

      // Order status breakdown
      const ordersByStatus: Record<string, number> = {};
      (orders || []).forEach((order) => {
        ordersByStatus[order.status] = (ordersByStatus[order.status] || 0) + 1;
      });

      // Daily revenue (last 7 days)
      const dailyRevenue: { date: string; revenue: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        const dayRevenue = (orders || [])
          .filter((o) => {
            const orderDate = new Date(o.created_at);
            return orderDate >= dayStart && orderDate <= dayEnd;
          })
          .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

        dailyRevenue.push({
          date: format(date, 'MMM d'),
          revenue: dayRevenue,
        });
      }

      return {
        totalRevenue,
        totalOrders,
        averageOrderValue,
        newCustomers,
        ordersByStatus,
        dailyRevenue,
        totalProducts: (products || []).length,
      };
    },
  });

  const exportToCSV = async (type: 'orders' | 'products' | 'customers' | 'inventory') => {
    try {
      let data: any[] = [];
      let filename = '';

      if (type === 'orders') {
        const { data: orders } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        data = orders || [];
        filename = `orders_${format(new Date(), 'yyyy-MM-dd')}.csv`;
      } else if (type === 'products') {
        const { data: products } = await supabase
          .from('products')
          .select('*')
          .order('name');
        data = products || [];
        filename = `products_${format(new Date(), 'yyyy-MM-dd')}.csv`;
      } else if (type === 'customers') {
        const { data: customers } = await supabase
          .from('customers')
          .select('*')
          .order('created_at', { ascending: false });
        data = customers || [];
        filename = `customers_${format(new Date(), 'yyyy-MM-dd')}.csv`;
      } else if (type === 'inventory') {
        data = inventoryData?.items || [];
        filename = `inventory_valuation_${format(new Date(), 'yyyy-MM-dd')}.csv`;
      }

      if (data.length === 0) {
        toast.error('No data to export');
        return;
      }

      // Convert to CSV
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map((row) =>
          headers
            .map((header) => {
              const value = row[header];
              if (value === null || value === undefined) return '';
              if (typeof value === 'string' && value.includes(',')) {
                return `"${value}"`;
              }
              return value;
            })
            .join(',')
        ),
      ].join('\n');

      // Download
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success(`${type} exported successfully`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    }
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: `£${(reportData?.totalRevenue || 0).toFixed(2)}`,
      icon: DollarSign,
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Total Orders',
      value: reportData?.totalOrders || 0,
      icon: ShoppingCart,
      trend: '+8.2%',
      trendUp: true,
    },
    {
      title: 'Avg Order Value',
      value: `£${(reportData?.averageOrderValue || 0).toFixed(2)}`,
      icon: TrendingUp,
      trend: '+3.1%',
      trendUp: true,
    },
    {
      title: 'New Customers',
      value: reportData?.newCustomers || 0,
      icon: Users,
      trend: '+15.3%',
      trendUp: true,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">Financial insights and data exports</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="thisMonth">This month</SelectItem>
                <SelectItem value="thisYear">This year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="financial">
              <DollarSign className="mr-2 h-4 w-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <Warehouse className="mr-2 h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="export">
              <Download className="mr-2 h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      {stat.trendUp ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      )}
                      <span className={stat.trendUp ? 'text-green-600' : 'text-destructive'}>
                        {stat.trend}
                      </span>
                      <span>vs last period</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Status Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status Breakdown</CardTitle>
                <CardDescription>Distribution of orders by status</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-32 flex items-center justify-center">Loading...</div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-5">
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                      <div key={status} className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold">
                          {reportData?.ordersByStatus[status] || 0}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">{status}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Daily Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Revenue (Last 7 Days)</CardTitle>
                <CardDescription>Revenue trend over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-32 flex items-center justify-center">Loading...</div>
                ) : (
                  <div className="grid gap-2 md:grid-cols-7">
                    {reportData?.dailyRevenue.map((day) => (
                      <div key={day.date} className="text-center p-3 border rounded-lg">
                        <p className="text-lg font-bold">£{day.revenue.toFixed(0)}</p>
                        <p className="text-xs text-muted-foreground">{day.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            {/* Financial Summary */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    £{(financialData?.totalRevenue || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    From {financialData?.completedOrders || 0} completed orders
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Cost of Goods Sold
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">
                    £{(financialData?.totalCOGS || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">Direct product costs</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Gross Profit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    £{(financialData?.grossProfit || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {(financialData?.grossMargin || 0).toFixed(1)}% margin
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Purchases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    £{(financialData?.totalPurchases || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">From purchase orders</p>
                </CardContent>
              </Card>
            </div>

            {/* Profit Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Profit Analysis
                </CardTitle>
                <CardDescription>Revenue vs costs breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                {financialLoading ? (
                  <div className="h-32 flex items-center justify-center">Loading...</div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Revenue</span>
                        <span className="font-bold text-green-600">
                          £{(financialData?.totalRevenue || 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cost of Goods</span>
                        <span className="font-bold text-destructive">
                          -£{(financialData?.totalCOGS || 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="font-medium">Gross Profit</span>
                        <span className="font-bold">
                          £{(financialData?.grossProfit || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary">
                          {(financialData?.grossMargin || 0).toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Gross Margin</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            {/* Inventory Summary */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Cost Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    £{(inventoryData?.summary.totalCostValue || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">At cost price</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Retail Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    £{(inventoryData?.summary.totalRetailValue || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">At selling price</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Potential Profit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    £{(inventoryData?.summary.totalPotentialProfit || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">If all sold at retail</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Avg Margin
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(inventoryData?.summary.averageMargin || 0).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {inventoryData?.summary.totalSKUs || 0} SKUs, {inventoryData?.summary.totalItems || 0} units
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Inventory Valuation Table */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Valuation by Product</CardTitle>
                <CardDescription>Stock value and profit margins</CardDescription>
              </CardHeader>
              <CardContent>
                {inventoryLoading ? (
                  <div className="h-32 flex items-center justify-center">Loading...</div>
                ) : (
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Qty</TableHead>
                          <TableHead className="text-right">Cost Price</TableHead>
                          <TableHead className="text-right">Retail Price</TableHead>
                          <TableHead className="text-right">Stock Value</TableHead>
                          <TableHead className="text-right">Margin</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(inventoryData?.items || []).slice(0, 10).map((item: any) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{item.productName}</p>
                                <p className="text-xs text-muted-foreground">{item.productSku}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">£{item.costPrice.toFixed(2)}</TableCell>
                            <TableCell className="text-right">£{item.unitPrice.toFixed(2)}</TableCell>
                            <TableCell className="text-right">£{item.costValue.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <span className={item.margin > 30 ? 'text-green-600 font-medium' : ''}>
                                {item.margin.toFixed(1)}%
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Download your data as CSV files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start"
                    onClick={() => exportToCSV('orders')}
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Export Orders</p>
                        <p className="text-sm text-muted-foreground">Download all orders as CSV</p>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start"
                    onClick={() => exportToCSV('products')}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Export Products</p>
                        <p className="text-sm text-muted-foreground">Download product catalog</p>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start"
                    onClick={() => exportToCSV('customers')}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Export Customers</p>
                        <p className="text-sm text-muted-foreground">Download customer list</p>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start"
                    onClick={() => exportToCSV('inventory')}
                  >
                    <div className="flex items-center gap-3">
                      <Warehouse className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Export Inventory</p>
                        <p className="text-sm text-muted-foreground">Download inventory valuation</p>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
