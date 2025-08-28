import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Peer {
  name: string;
  ticker: string;
  pe: string;
  marketCap: string;
}

interface PeerComparisonProps {
  peers: Peer[];
}

export const PeerComparison = ({ peers }: PeerComparisonProps) => {
  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Company</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead className="text-right">P/E</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peers.map((peer, index) => (
              <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">
                  {peer.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {peer.ticker}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {peer.pe}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {peer.marketCap}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        Comparative analysis shows relative positioning within the sector based on key valuation metrics.
      </div>
    </div>
  );
};