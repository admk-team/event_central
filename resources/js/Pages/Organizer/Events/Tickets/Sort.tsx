import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../../../Layouts/Event";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import React, { useState } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import DataTable, { ColumnDef } from "../../../../Components/DataTable";
import DeleteModal from "../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../Components/Common/DeleteManyModal";
import HasPermission from "../../../../Components/HasPermission";
import CreateEditModal from "./CreateEditModal";
import moment from "moment";
import { DialogBackdrop } from "@headlessui/react";
import DnDList from 'react-dnd-list'
import { Button as RBButton, ListGroup } from 'react-bootstrap'

function Sort({ tickets }: any) {
  const initialList = (tickets && tickets.length)
    ? tickets.map((t: any) => ({
        id: String(t.id),
        label: t.name || t.title || `Ticket ${t.id}`,
        // infer common price fields; leave null if not present
        price: t.price || t.amount || t.price_display || t.display_price || null,
      }))
    : [
        { id: '1', label: 'General Admission', price: 0 },
        { id: '2', label: 'VIP', price: 50 },
        { id: '3', label: 'Student', price: 25 },
      ]

  const [list, setList] = useState(initialList)

  function handleSaveOrder() {
    const ids = list.map((l: any) => l.id)
    router.post(route('organizer.events.tickets.sort'), { ids }, {
        preserveScroll: true,
    });
  }

  return (
    <>
      <Head title="Tickets" />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Tickets" pageTitle="Dashboard" />
          <Container>
            <Row>
              <Col xs={12}>
              <HasPermission permission="view_tickets">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Sort Tickets</h5>
                    <p className="card-title-desc">Drag to reorder tickets. Click Save Order to persist.</p>

                    <ListGroup as="ul" className="mb-3">
                      <DnDList
                        items={list}
                        itemComponent={Item}
                        setList={setList}
                        type="ul"
                      />
                    </ListGroup>

                    <RBButton variant="primary" onClick={handleSaveOrder}>Save</RBButton>
                  </div>
                </div>
              </HasPermission>
            </Col>
            </Row>
          </Container>
        </Container>
      </div>
    </>
  )
}
Sort.layout = (page: any) => <Layout children={page} />;
export default Sort;

function Item(props: any) {
  const dnd = props.dnd
  const item = props.item

  // Inline styles for the list item container
  const containerStyles: React.CSSProperties = {
    ...dnd.item.styles,
    ...dnd.handler.styles,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    padding: '0.5rem 0.75rem',
    marginBottom: '0.25rem',
    borderRadius: 6,
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    background: '#fff',
  }

  const labelStyles: React.CSSProperties = { flex: 1, marginRight: '0.5rem' }
  const handleStyles: React.CSSProperties = { cursor: 'grab', padding: '0.25rem 0.5rem', color: '#6c757d' }

  function formatPrice(raw: any) {
    if (raw == null) return ''
    // If it's a number, format as currency (assume USD). If it's a string, show as-is.
    if (typeof raw === 'number' && !Number.isNaN(raw)) {
      // If the number looks like cents (integer and > 100), still format as dollars.
      const asDollars = raw > 100 && Number.isInteger(raw) ? raw / 100 : raw
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(asDollars)
    }
    return String(raw)
  }

//   const priceLabelStyles: React.CSSProperties = { color: '#6c757d', marginRight: '0.5rem', whiteSpace: 'nowrap' }

  return (
    <ListGroup.Item
      as="li"
      style={containerStyles}
      className={dnd.item.classes}
      ref={dnd.item.ref}
      {...dnd.handler.listeners}
    >
      <div style={labelStyles}>{item && (item.label || item)}</div>
      {/* {item && item.price != null && (
        <div style={priceLabelStyles} aria-hidden>
          {formatPrice(item.price)}
        </div>
      )} */}
      <div style={handleStyles} aria-hidden>
        {/* simple drag handle */}
        <span style={{ fontSize: 16, lineHeight: 1 }}>&#x2630;</span>
      </div>
    </ListGroup.Item>
  )
}