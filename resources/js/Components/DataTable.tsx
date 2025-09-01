import React, { useEffect, useState } from 'react'
import { Button, Form, Spinner, Table } from 'react-bootstrap'
import Pagination from './Common/Pagination'
import { router } from '@inertiajs/react'
import { ArrowDown, ArrowUp, ChevronDown, ChevronsUpDown, ChevronUp, Search, X } from 'lucide-react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useLaravelReactI18n } from "laravel-react-i18n";
type Column<T> = {
    accessorKey?: string;
    header: () => React.ReactNode;
    headerClass?: string;
    headerStyle?: React.CSSProperties;
    cell: (row: T) => React.ReactNode;
    cellClass?: string;
    cellStyle?: React.CSSProperties;
    enableSorting?: boolean;
    searchable?: boolean;
}

export type ColumnDef<T> = Column<T>[]

interface DataTable<T> {
    data: T[];
    getSelectedRows(): T[];
}

export type DataTableAction<T> = {
    render: React.ReactNode | ((dataTable: DataTable<T>) => React.ReactNode)
    showOnRowSelection?: boolean
}

type DataTableProps<T> = {
    columns: ColumnDef<T>;
    data: {
        data: T[],
        links: any
    };
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    actions?: DataTableAction<T>[];
    disableRowSelection?: boolean;
    tableLayoutFixed?: boolean;
    searchCombinations?: string[][];
}

export default function DataTable<T>({
    columns,
    data,
    title,
    description,
    actions,
    disableRowSelection,
    tableLayoutFixed,
    searchCombinations
}: DataTableProps<T>) {
    const { t } = useLaravelReactI18n();
    const rowSelector = useRowSelector(data.data);
    console.log('testing', columns.map((col, colIndex) => col.header.name));
    const [sort, setSort] = useSort();

    const { hasSearch, searchQuery, setSearchQuery, search, searchProcessing } = useSearch(columns, searchCombinations);

    const dataTable: DataTable<T> = {
        data: data.data,
        getSelectedRows: rowSelector.getSelectedRows,
        getCurrentPageRows: () => data.data
    };
    // toggle the columns
    const [visibleColumnsIndexes, setVisibleColumnsIndexes] = useState<number[]>([]);

    // Sync from localStorage
    useEffect(() => {
        const stored = window.localStorage.getItem(`${title}`);
        if (stored) {
            setVisibleColumnsIndexes(JSON.parse(stored));
        } else {
            const allIndexes = columns.map((_, index) => index);
            setVisibleColumnsIndexes(allIndexes);
            window.localStorage.setItem(`${title}`, JSON.stringify(allIndexes));
        }
    }, [columns, title]);

    // Toggle column visibility
    const toggleColumnVisibility = (index: number) => {
        setVisibleColumnsIndexes(prev => {
            const updated = prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index];
            window.localStorage.setItem(`${title}`, JSON.stringify(updated));
            return updated;
        });
    };

    const filteredColumns = columns.filter((_, index) => visibleColumnsIndexes.includes(index));
    console.log(`filterColumns of ${title}`, filteredColumns);

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                {/* Title and Description */}
                <div>
                    {title && <h5 className="card-title mb-0">{title}</h5>}
                    {description && <div className="card-description">{description}</div>}
                </div>

                {/* Search */}
                {hasSearch && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        search();
                    }}>
                        <div className="input-group w-auto position-relative">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    paddingRight: '25px',
                                }}
                            />
                            {searchQuery && (
                                <X
                                    className="position-absolute cursor-pointer"
                                    size={20}
                                    style={{ top: '8px', right: '38px' }}
                                    onClick={() => {
                                        search('');
                                    }}
                                />
                            )}
                            <Button type="submit" size="sm">
                                {searchProcessing ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Search size={16} />
                                )}
                            </Button>
                        </div>
                    </form>
                )}

                {/* Actions */}
                <div className="d-flex justify-content-end align-items-center gap-2">

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Toggle Columns
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {columns
                                .map((col, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        as="label"
                                        className="d-flex align-items-center gap-2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <Form.Check
                                            type="checkbox"
                                            checked={visibleColumnsIndexes.includes(index)}
                                            onChange={() => toggleColumnVisibility(index)}
                                        />
                                        {typeof col.header === 'function' ? col.header() : col.header}
                                    </Dropdown.Item>
                                ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {actions?.map((action, i) => {
                        if (action.showOnRowSelection && rowSelector.getSelectedRows().length === 0) {
                            return null;
                        }

                        return (
                            <div key={i}>
                                {typeof action.render === 'function' ? action.render(dataTable) : action.render}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Table */}
            <div className="card-body p-0">
                <div className="table-responsive">
                    <Table className="table-borderless align-middle table-nowrap mb-0" style={tableLayoutFixed ? { tableLayout: 'fixed' } : undefined}>
                        <thead className="table-light">
                            <tr>
                                {!disableRowSelection && (
                                    <th style={tableLayoutFixed ? { width: '40px' } : undefined}>
                                        <Form.Check.Input
                                            onChange={(e) => rowSelector.handleAllRowSelection(e.target.checked)}
                                            checked={data.data.length > 0 && rowSelector.isAllRowSelected()}
                                        />
                                    </th>
                                )}
                                {filteredColumns.map((col, colIndex) => (
                                    <th scope="col" className={col.headerClass || ''} key={colIndex} style={col.headerStyle}>
                                        {col.enableSorting && col.header ? (
                                            <div
                                                onClick={() => setSort(col.header as any)}
                                                className="d-flex justify-content-between align-items-center cursor-pointer"
                                            >
                                                <div>{col.header()}</div>
                                                <div>
                                                    {col.header !== sort?.column as any ? (
                                                        <ChevronsUpDown size={20} color="#666" />
                                                    ) : sort?.desc ? (
                                                        <ArrowDown size={17} color="#666" />
                                                    ) : (
                                                        <ArrowUp size={17} color="#666" />
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            col.header()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.length > 0 ? (
                                data.data.map((row, rowIndex) => (
                                    <tr key={rowIndex} className={`${rowSelector.isRowSelected(row) ? 'table-active' : ''}`}>
                                        {!disableRowSelection && (
                                            <td>
                                                <Form.Check.Input
                                                    onChange={(e) => rowSelector.handleRowSelection(e.target.checked, row)}
                                                    checked={rowSelector.isRowSelected(row)}
                                                />
                                            </td>
                                        )}
                                        {filteredColumns.map((col, colIndex) => (
                                            <td className={col.cellClass || ''} key={colIndex} style={col.cellStyle}>
                                                {col.cell(row)}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={filteredColumns.length + (!disableRowSelection ? 1 : 0)}
                                        className="text-center fw-semibold"
                                    >
                                        {t("No data found")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <div className="card-footer">
                {data.links.length > 3 && (
                    <Pagination
                        links={data.links}
                    />
                )}
            </div>
        </div>
    )
}

function useRowSelector<T>(data: T[]) {
    const [selectedRows, setSelectedRows] = React.useState<T[]>([]);

    const isRowSelected = (row: T) => {
        for (const item of selectedRows) {
            if (item === row) {
                return true;
            }
        }

        return false;
    }

    const isAllRowSelected = () => {
        for (const row of data) {
            if (!isRowSelected(row)) {
                return false;
            }
        }

        return true;
    }

    const selectRow = (row: T) => {
        if (!isRowSelected(row)) {
            setSelectedRows(prevState => [...prevState, row]);
        }
    }

    const unselectRow = (row: T) => {
        setSelectedRows(prevState => {
            let newState = [...prevState];
            newState = newState.filter(item => item !== row);
            return newState;
        });
    }

    const handleRowSelection = (select: boolean, row: T) => {
        if (select) {
            selectRow(row);
        } else {
            unselectRow(row);
        }
    }

    const handleAllRowSelection = (select: boolean) => {
        if (select) {
            setSelectedRows(data);
        } else {
            setSelectedRows([]);
        }
    }

    useEffect(() => {
        setSelectedRows([]);
    }, [data]);

    return {
        getSelectedRows() {
            return selectedRows;
        },
        isRowSelected,
        isAllRowSelected,
        handleRowSelection,
        handleAllRowSelection,
    };
}

type Sort = { column: string, desc: boolean } | null
type SetSort = (column: string) => void

function useSort(): [{ column: string, desc: boolean } | null, (column: string) => void] {
    const url = new URL(window.location.href);
    const sortParam = url.searchParams.get('sort');

    const sort: Sort = sortParam ? JSON.parse(sortParam) : null;

    const setSort: SetSort = (column: string) => {
        url.searchParams.set('sort', JSON.stringify({
            column: column,
            desc: sort?.column === column ? !sort.desc : false,
        }));

        router.visit(url.toString());
    }

    return [sort, setSort]
}

type Search = { query: string, columns: string[] } | null
type setSearchQuery = (query?: string) => void

function useSearch<T>(columns: ColumnDef<T>, combinations: DataTableProps<T>['searchCombinations']) {
    const searchableColumns = columns.filter(col => col.searchable === true && col.accessorKey);

    const url = new URL(window.location.href);
    const searchParam = url.searchParams.get('search');

    const search: Search = searchParam ? JSON.parse(searchParam) : null;


    const [searchQuery, setSearchQuery] = React.useState(search?.query ?? '');
    const [searchProcessing, setSearchProcessing] = React.useState(false);

    const doSearch: setSearchQuery = (query) => {
        if (query !== undefined) setSearchQuery(query);

        url.searchParams.set('search', JSON.stringify({
            query: query !== undefined ? query : searchQuery,
            columns: searchableColumns.map(column => column.accessorKey),
            combinations: combinations,
        }));

        setSearchProcessing(true);

        router.visit(url.toString(), {
            onFinish: () => setSearchProcessing(false),
        });
    }

    return {
        hasSearch: searchableColumns.length > 0,
        searchQuery,
        setSearchQuery,
        search: doSearch,
        searchProcessing,
    };
}
