import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency, getMonth } from "@/lib/utils";
import assetsMap from "@/lib/maps/assets";

export default function Details({
  data,
}: {
  data: NetWorthAssetsCollection[] | null;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Details</CardTitle>
        <CardDescription className="!mt-0">
          Detailed account of all categories by month
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(data[0]).map((key, index) => (
                  <TableHead
                    key={key}
                    className={cn(
                      "font-medium capitalize",
                      index > 0 && "text-right"
                    )}
                  >
                    {assetsMap[key]}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: NetWorthAssetsCollection) => (
                <TableRow key={item["$id"]}>
                  {Object.keys(item).map(
                    (key, index) =>
                      key !== "$id" && (
                        <TableCell
                          key={key}
                          className={cn("font-mono", index > 0 && "text-right")}
                        >
                          {index === 0
                            ? getMonth(item[key], true)
                            : item[key] === null
                            ? "-"
                            : formatCurrency(item[key])}
                        </TableCell>
                      )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-destructive">No data</p>
        )}
      </CardContent>
    </Card>
  );
}
