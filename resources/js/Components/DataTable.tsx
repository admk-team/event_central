import React from 'react'
import { Table } from 'react-bootstrap'
import Pagination from './Common/Pagination'

type Column<T> = {
    header: () => React.ReactNode
    headerClass?: string
    cell: (row: T) => React.ReactNode
    cellClass?: string
}

export type ColumnDef<T> = Column<T>[]

export type DataTableAction = {
    render: React.ReactNode | (() => React.ReactNode)
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
    actions?: DataTableAction[]
}

export default function DataTable<T>({
    columns,
    data,
    title,
    description,
    actions
}: DataTableProps<T>) {
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                {/* Title and Description */}
                <div>
                    {title && <h5 className="card-title">{title}</h5>}
                    {description && <div className="card-description">{description}</div>}
                </div>

                {/* Actions */}
                <div>
                    {actions && actions.map((action, i) => (
                        <div key={i}>
                            {typeof action.render === 'function' ? action.render() : action.render}
                        </div>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="card-body">
                <div className="table-responsive">
                    <Table className="table-borderless align-middle table-nowrap mb-0">
                        <thead>
                            <tr>
                                {columns.map((col, colIndex) => (
                                    <th scope="col" className={col.headerClass || ''} key={colIndex}>{col.header()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
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
