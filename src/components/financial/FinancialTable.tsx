import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface FinancialData {
  period: string;
  revenue: string;
  revenueYoY: string;
  netProfit: string;
  profitYoY: string;
  eps: string;
  margin: string;
}

const mockData: FinancialData[] = [
  {
    period: "Q4 FY24",
    revenue: "₹2,01,920 Cr",
    revenueYoY: "+8.2%",
    netProfit: "₹19,299 Cr",
    profitYoY: "+12.1%", 
    eps: "₹28.45",
    margin: "9.6%"
  },
  {
    period: "Q3 FY24",
    revenue: "₹1,86,650 Cr",
    revenueYoY: "+5.1%",
    netProfit: "₹17,806 Cr",
    profitYoY: "+8.7%",
    eps: "₹26.21",
    margin: "9.5%"
  },
  {
    period: "Q2 FY24", 
    revenue: "₹1,78,230 Cr",
    revenueYoY: "+7.3%",
    netProfit: "₹16,518 Cr",
    profitYoY: "+15.2%",
    eps: "₹24.31",
    margin: "9.3%"
  },
  {
    period: "Q1 FY24",
    revenue: "₹1,72,110 Cr", 
    revenueYoY: "+6.8%",
    netProfit: "₹15,138 Cr",
    profitYoY: "+11.8%",
    eps: "₹22.27",
    margin: "8.8%"
  }
];

export const FinancialTable = () => {
  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return "text-bullish";
    if (change.startsWith('-')) return "text-bearish";
    return "text-neutral";
  };

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[100px]">Period</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead className="text-center">YoY %</TableHead>
            <TableHead>Net Profit</TableHead>
            <TableHead className="text-center">YoY %</TableHead>
            <TableHead>EPS</TableHead>
            <TableHead className="text-right">Margin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((row, index) => (
            <TableRow key={index} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-mono text-sm">
                <Badge variant="outline" className="font-mono">
                  {row.period}
                </Badge>
              </TableCell>
              <TableCell className="font-mono font-medium">
                {row.revenue}
              </TableCell>
              <TableCell className={`text-center font-mono font-medium ${getChangeColor(row.revenueYoY)}`}>
                {row.revenueYoY}
              </TableCell>
              <TableCell className="font-mono font-medium">
                {row.netProfit}
              </TableCell>
              <TableCell className={`text-center font-mono font-medium ${getChangeColor(row.profitYoY)}`}>
                {row.profitYoY}
              </TableCell>
              <TableCell className="font-mono font-medium">
                {row.eps}
              </TableCell>
              <TableCell className="text-right font-mono font-medium">
                {row.margin}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};