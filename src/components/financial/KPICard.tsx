import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  subtitle?: string;
  tooltip?: string;
  icon?: LucideIcon;
  className?: string;
}

export const KPICard = ({ 
  title, 
  value, 
  change, 
  subtitle, 
  tooltip, 
  icon: Icon,
  className 
}: KPICardProps) => {
  const isPositive = change && change.startsWith('+');
  const isNegative = change && change.startsWith('-');
  
  return (
    <Card className={cn(
      "bg-gradient-card shadow-financial hover:shadow-glow transition-all duration-300",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <div className={cn(
              "text-sm font-medium",
              isPositive && "text-bullish",
              isNegative && "text-bearish",
              !isPositive && !isNegative && "text-neutral"
            )}>
              {change}
            </div>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};