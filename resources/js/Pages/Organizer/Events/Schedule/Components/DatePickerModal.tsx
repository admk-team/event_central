import React, { HTMLAttributes } from 'react'
import { Spinner, Form, FormGroup, Modal } from 'react-bootstrap';
import { CalendarDay, DayPicker, Modifiers } from "react-day-picker";
import "react-day-picker/style.css";

export default function DatePickerModal({ show, hide, onHide }: { show: boolean, hide: () => void, onHide: () => void }) {
    const [selected, setSelected] = React.useState<Date>();
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">Select Day</h5>
            </Modal.Header>
            <Modal.Body className="py-2 d-flex">
                <DayPicker
                    animate
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    components={{
                        DayButton: CustomDay
                    }}
                />
                <div>dsfdsfdsf</div>
            </Modal.Body>
            <div className="modal-footer">
                <div className="hstack gap-2 justify-content-end">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={hide}
                    >
                        Done
                    </button>
                </div>
            </div>
        </Modal>
    )
}


function CustomDay(props: { day: CalendarDay; modifiers: Modifiers; } & HTMLAttributes<HTMLDivElement>) {
    return <button className="rdp-day_button test" type="button">{props.day.date.getDay()}</button>
}