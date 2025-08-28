import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface NewsItem {
  date: string;
  headline: string;
  summary: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  source: string;
}

interface NewsListProps {
  items: NewsItem[];
  maxItems?: number;
}

export const NewsList = ({ items, maxItems = 10 }: NewsListProps) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "bg-bullish text-bullish-foreground";
      case "Negative":
        return "bg-bearish text-bearish-foreground";
      default:
        return "bg-neutral text-neutral-foreground";
    }
  };

  const displayItems = items.slice(0, maxItems);

  return (
    <div className="space-y-4">
      {displayItems.map((item, index) => (
        <div 
          key={index}
          className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Badge 
                  className={getSentimentColor(item.sentiment)}
                  variant="secondary"
                >
                  {item.sentiment}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleDateString()}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {item.source}
                </span>
              </div>
              <h4 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                {item.headline}
              </h4>
              <p className="text-sm text-muted-foreground">
                {item.summary}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
};