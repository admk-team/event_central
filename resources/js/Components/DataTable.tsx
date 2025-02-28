import React, { useEffect } from 'react'
import { Form, Table } from 'react-bootstrap'
import Pagination from './Common/Pagination'
import { router } from '@inertiajs/react'
import { ArrowDown, ArrowUp, ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react'

type Column<T> = {
    accessorKey?: string
    header: () => React.ReactNode
    headerClass?: string
    cell: (row: T) => React.ReactNode
    cellClass?: string
    enableSorting?: boolean
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
    columns: ColumnDef<T>
    data: {
        data: T[],
        links: any
    }
    title?: string | React.ReactNode
    description?: string | React.ReactNode
    actions?: DataTableAction<T>[]
    disableRowSelection?: boolean
}

export default function DataTable<T>({
    columns,
    data,
    title,
    description,
    actions,
    disableRowSelection
}: DataTableProps<T>) {
    const rowSelector = useRowSelector(data.data);

    const [sort, setSort] = useSort();

    const dataTable: DataTable<T> = {
        data: data.data,
        getSelectedRows: rowSelector.getSelectedRows,
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                {/* Title and Description */}
                <div>
                    {title && <h5 className="card-title mb-0">{title}</h5>}
                    {description && <div className="card-description">{description}</div>}
                </div>

                {/* Actions */}
                <div className="d-flex justify-content-end align-items-center gap-2">
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
                    <Table className="table-borderless align-middle table-nowrap mb-0">
                        <thead>
                            <tr>
                                {!disableRowSelection && (
                                    <th>
                                        <Form.Check.Input onChange={(e) => rowSelector.handleAllRowSelection(e.target.checked)} checked={data.data.length > 0 && rowSelector.isAllRowSelected()} />
                                    </th>
                                )}
                                {columns.map((col, colIndex) => (
                                    <th scope="col" className={col.headerClass || ''} key={colIndex}>
                                        {col.enableSorting && col.accessorKey ? (
                                            <div
                                                onClick={() => setSort(col.accessorKey as string)} 
                                                className="d-flex justify-content-between align-items-center cursor-pointer"
                                            >
                                                <div>{col.header()}</div>
                                                <div>
                                                    {col.accessorKey !== sort?.column ? (
                                                        <ChevronsUpDown size={20} color='#666' />
                                                    ) : (
                                                        sort.desc ? (
                                                            <ArrowDown size={17} color='#666' />
                                                        ) : (
                                                            <ArrowUp size={17} color='#666' />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ) : col.header()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((row, rowIndex) => (
                                <tr key={rowIndex} className={`${rowSelector.isRowSelected(row) ? 'table-active' : ''}`}>
                                    {!disableRowSelection && (
                                        <td>
                                            <Form.Check.Input onChange={(e) => rowSelector.handleRowSelection(e.target.checked, row)} checked={rowSelector.isRowSelected(row)} />
                                        </td>
                                    )}
                                    {columns.map((col, colIndex) => (
                                        <td className={col.cellClass || ''} key={colIndex}>{col.cell(row)}</td>
                                    ))}
                                </tr>
                            ))}
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
            if (! isRowSelected(row)) {
                return false;
            }
        }

        return true;
    }

    const selectRow = (row: T) => {
        if (! isRowSelected(row)) {
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

    const sort: Sort = sortParam ? JSON.parse(sortParam): null;

    const setSort: SetSort = (column: string) => {
        url.searchParams.set('sort', JSON.stringify({
            column: column,
            desc: sort?.column === column? !sort.desc : false,
        }));

        router.visit(url.toString());
    }

    return [sort, setSort]
}