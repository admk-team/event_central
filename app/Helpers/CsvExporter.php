<?php

namespace App\Helpers;

class CsvExporter
{
    public static function export(string $fileName, array $datasets)
    {
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename={$fileName}",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $callback = function () use ($datasets) {
            $file = fopen('php://output', 'w');

            foreach ($datasets as $dataset) {
                if (!empty($dataset['title'])) {
                    fputcsv($file, [$dataset['title']]);
                }
                fputcsv($file, $dataset['columns']);
                foreach ($dataset['rows'] as $row) {
                    fputcsv($file, $row);
                }
                fputcsv($file, []);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
