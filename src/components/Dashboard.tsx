import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, BarChart3, Newspaper, Users } from "lucide-react";
import { KPICard } from "./financial/KPICard";
import { FinancialTable } from "./financial/FinancialTable";
import { NewsList } from "./financial/NewsList";
import { PeerComparison } from "./financial/PeerComparison";

interface StockReport {
  meta: {
    ticker: string;
    companyName: string;
    exchange: string;
    as_of: string;
    currency: string;
  };
  fundamental: any;
  technical: any;
  news_sentiment: any;
  peer_screener: any;
}

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<StockReport | null>(null);

  const handleAnalyze = async () => {
    if (!ticker.trim()) return;
    
    setLoading(true);
    // Mock data for demo - in real app would fetch from API
    setTimeout(() => {
      setReport({
        meta: {
          ticker: ticker.toUpperCase(),
          companyName: "Reliance Industries Limited",
          exchange: "NSE",
          as_of: "2025-08-28",
          currency: "INR"
        },
        fundamental: {
          marketCap: "₹18,45,230 Cr",
          marketCapChange: "+2.4%",
          pe: "24.56",
          pb: "1.89",
          revenue: "₹7,92,756 Cr",
          revenueGrowth: "+8.2%",
          netProfit: "₹73,670 Cr",
          profitGrowth: "+12.1%"
        },
        technical: {
          price: "₹2,745.30",
          change: "+23.50",
          changePercent: "+0.86%",
          trend: "Bullish"
        },
        news_sentiment: {
          score: 7.2,
          items: [
            {
              date: "2025-08-28",
              headline: "Reliance Q4 results beat estimates",
              summary: "Strong performance in retail and digital segments",
              sentiment: "Positive",
              source: "ET Now"
            },
            {
              date: "2025-08-27", 
              headline: "RIL announces expansion in green energy",
              summary: "₹75,000 crore investment in renewable energy projects",
              sentiment: "Positive",
              source: "Bloomberg"
            }
          ]
        },
        peer_screener: {
          peers: [
            { name: "Tata Consultancy Services", ticker: "TCS", pe: "28.4", marketCap: "₹14,23,890 Cr" },
            { name: "HDFC Bank", ticker: "HDFCBANK", pe: "18.7", marketCap: "₹12,45,670 Cr" }
          ]
        }
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Equity 360 Radar
                </h1>
                <p className="text-muted-foreground mt-1">
                  Comprehensive Indian Stock Analysis Platform
                </p>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                Live Market Data
              </Badge>
            </div>
            
            <div className="flex gap-3 max-w-md">
              <Input
                placeholder="Enter stock ticker (e.g., RELIANCE, TCS)"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              />
              <Button 
                onClick={handleAnalyze}
                disabled={loading || !ticker.trim()}
                className="px-6"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                Analyze
              </Button>
            </div>
          </div>
        </div>
      </div>

      {report && (
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Stock Header */}
          <div className="bg-gradient-card rounded-lg p-6 shadow-financial">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{report.meta.companyName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{report.meta.ticker}</Badge>
                  <Badge variant="secondary">{report.meta.exchange}</Badge>
                  <span className="text-sm text-muted-foreground">
                    As of {new Date(report.meta.as_of).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{report.technical.price}</div>
                <div className="flex items-center gap-2">
                  <span className="text-bullish">+{report.technical.change}</span>
                  <span className="text-bullish">({report.technical.changePercent})</span>
                  <TrendingUp className="w-4 h-4 text-bullish" />
                </div>
              </div>
            </div>
          </div>

          {/* KPI Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Market Cap"
              value={report.fundamental.marketCap}
              change={report.fundamental.marketCapChange}
              icon={BarChart3}
            />
            <KPICard
              title="P/E Ratio"
              value={report.fundamental.pe}
              subtitle="TTM"
              icon={TrendingUp}
            />
            <KPICard
              title="Revenue"
              value={report.fundamental.revenue}
              change={report.fundamental.revenueGrowth}
              subtitle="TTM"
              icon={BarChart3}
            />
            <KPICard
              title="Net Profit"
              value={report.fundamental.netProfit}
              change={report.fundamental.profitGrowth}
              subtitle="TTM"
              icon={TrendingUp}
            />
          </div>

          {/* Analysis Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fundamental Analysis */}
            <Card className="bg-gradient-card shadow-financial">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <CardTitle>Fundamental Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <FinancialTable />
              </CardContent>
            </Card>

            {/* Technical Analysis */}
            <Card className="bg-gradient-card shadow-financial">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <CardTitle>Technical Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                    <span>Trend</span>
                    <Badge className="bg-bullish text-bullish-foreground">
                      {report.technical.trend}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Technical indicators show a strong bullish trend with price above key moving averages.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* News & Sentiment */}
            <Card className="bg-gradient-card shadow-financial">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-primary" />
                  <CardTitle>News & Sentiment</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <NewsList items={report.news_sentiment.items} />
              </CardContent>
            </Card>

            {/* Peer Comparison */}
            <Card className="bg-gradient-card shadow-financial">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <CardTitle>Peer Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <PeerComparison peers={report.peer_screener.peers} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!report && !loading && (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Get Started</h3>
            <p className="text-muted-foreground">
              Enter a stock ticker above to generate a comprehensive 360° analysis report.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;