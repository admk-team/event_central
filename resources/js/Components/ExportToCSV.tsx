export function exportToCSV(rows: any[], columnsToExport: typeof columns, filename: string) {
        const exportableColumns = columnsToExport.filter(col => col.exportable !== false);

        const headers = exportableColumns.map(col => (typeof col.header === "function" ? col.header() : col.header));

        const csvRows = rows.map(row =>
            exportableColumns
                .map(col => {
                    let value;

                    if (col.exportValue) {
                        value = col.exportValue(row); // Use exportValue for CSV
                    } else if (col.accessorKey) {
                        let val = row;
                        const keys = col.accessorKey.split('.');
                        for (const key of keys) {
                            if (val && typeof val === 'object' && key in val) val = val[key];
                            else val = undefined;
                        }
                        value = val;
                        if (Array.isArray(value)) value = value.length;
                    } else {
                        value = '';
                    }

                    if (typeof value === "string" || typeof value === "number") {
                        return `"${String(value).replace(/"/g, '""')}"`;
                    }
                    return "";
                })
                .join(",")
        );

        const csvContent = [headers.join(","), ...csvRows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
