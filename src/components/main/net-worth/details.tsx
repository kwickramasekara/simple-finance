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
import { cn, formatCurrency, getMonth, cleanDBMetadata } from "@/lib/utils";
import assetsMap from "@/lib/maps/assets";
import EditAssets from "./edit-assets";

export default function Details({
  data,
}: {
  data: NetWorthAssetsCollection[] | null;
}) {
  // Keep original data with IDs for editing
  const originalData = data;
  const cleanedData = data
    ? (cleanDBMetadata(data) as NetWorthAssetsCollection[])
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Details</CardTitle>
        <CardDescription className="!mt-0">
          Detailed account of all categories by month
        </CardDescription>
      </CardHeader>
      <CardContent>
        {cleanedData && cleanedData.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(cleanedData[0]).map((key, index) => (
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cleanedData.map((item: NetWorthAssetsCollection, index) => (
                <TableRow key={index}>
                  {Object.keys(item).map((key, colIndex) => (
                    <TableCell
                      key={key}
                      className={cn("font-mono", colIndex > 0 && "text-right")}
                    >
                      {colIndex === 0
                        ? getMonth(item[key], true)
                        : item[key] === null
                        ? "-"
                        : formatCurrency(item[key])}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    {originalData && originalData[index] && (
                      <EditAssets data={originalData[index]} />
                    )}
                  </TableCell>
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
