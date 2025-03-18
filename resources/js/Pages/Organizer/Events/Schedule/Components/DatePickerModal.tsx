import { router, usePage } from '@inertiajs/react';
import moment from 'moment';
import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react'
import { Modal } from 'react-bootstrap';
import { CalendarDay, DayPicker, Modifiers } from "react-day-picker";
import "react-day-picker/style.css";
import toast from 'react-hot-toast';
import DeleteEventDateModal from '../../../../../Components/DeleteEventDateModal';

const EventDates = React.createContext<any>({});
const useEventDates = () => {
    return React.useContext(EventDates);
}


export default function DatePickerModal({ show, onHide, onDateSelect }: { show: boolean, onHide: () => void, onDateSelect: (date: any) => void }) {
    const eventDates = usePage().props.eventDates as any;

    const [mode, setMode] = React.useState<"view" | "edit">("view");
    const [selectedDate, _setSelectedDate] = React.useState<any>(eventDates[0] ?? null);
    const [showDayDeleteConfirmation, _setShowDayDeleteConfirmation] = React.useState(false);
    const [deleteDateId, setDeleteDateId] = React.useState<number | null>(null);
    
    const setShowDayDeleteConfirmation = (state: boolean) => {
        _setShowDayDeleteConfirmation(state);
        if (state === false) {
            setDeleteDateId(null);
        }
    }

    const _onHide = () => {
        setMode('view');
        onHide();
    }

    const setSelectedDate = (state: any) => {
        _setSelectedDate(state);
        _onHide();
    }

    const addDate = (date: string) => {
        toast.promise(
            new Promise((resolve, reject) => {
                router.visit(route('organizer.events.event-dates.store'), {
                    preserveScroll: true,
                    preserveState: true,
                    method: 'post',
                    data: { date },
                    onSuccess: resolve,
                    onError: reject,
                })
            }),
            {
                loading: 'Adding...',
                success: <b>Added!</b>,
                error: <b>Could not add.</b>,
            }
        );
    }

    const deleteDate = (id: number) => {
        setDeleteDateId(id);
        setShowDayDeleteConfirmation(true);
    }

    const deleteDateAfterConfirmation = () => {
        toast.promise(
            new Promise((resolve, reject) => {
                router.visit(route('organizer.events.event-dates.destroy', deleteDateId), {
                    preserveScroll: true,
                    preserveState: true,
                    method: 'post',
                    data: { _method: 'DELETE' },
                    onSuccess: resolve,
                    onError: reject,
                    onFinish: () => setDeleteDateId(null)
                })
            }),
            {
                loading: 'Deleting...',
                success: <b>Deleted!</b>,
                error: <b>Could not delete.</b>,
            }
        );
    }

    const getDate = (date: string) => {
        for (const item of eventDates) {
            if (date === item.date) {
                return item;
            }
        }

        return null;
    }

    const dateExists = (date: string) => {
        return !!getDate(date);
    }

    React.useEffect(() => {
        onDateSelect(selectedDate);
    }, [selectedDate]);

    return (
        <EventDates.Provider value={{
            mode,
            setMode,
            dates: eventDates,
            exists: dateExists,
            get: getDate,
            add: addDate,
            delete: deleteDate,
            selectedDate,
            setSelectedDate,
        }}>
            <Modal show={show} onHide={_onHide} centered className="event-date-picker">
                <Modal.Header className="bg-light p-3" closeButton>
                    <h5 className="modal-title">Select Day</h5>
                </Modal.Header>
                <Modal.Body>
                    <DayPicker
                        animate
                        mode="single"
                        components={{
                            Day: CustomDay,
                            DayButton: CustomDayButton,
                        }}
                    />
                </Modal.Body>
                <div className="modal-footer">
                    <div className="d-flex w-100 gap-2 justify-content-end">
                        <button
                            type="button"
                            className={`btn btn-${mode === 'view' ? 'light' : 'success'}`}
                            onClick={() => setMode(mode === 'view' ? 'edit' : 'view')}
                        >
                            Edit Days
                        </button>
                    </div>
                </div>
            </Modal>
            <DeleteEventDateModal
                show={showDayDeleteConfirmation}
                onDeleteClick={() => {
                    deleteDateAfterConfirmation();
                    setShowDayDeleteConfirmation(false);
                }}
                onCloseClick={() => setShowDayDeleteConfirmation(false)}
            />
        </EventDates.Provider>
    )
}


function CustomDay(props: { day: CalendarDay; modifiers: Modifiers; } & HTMLAttributes<HTMLDivElement>) {
    const eventDates = useEventDates();
    const dateMoment = moment(props.day.date);
    const dateFormatted = dateMoment.format('YYYY-MM-DD');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (eventDates.mode) {
        case 'edit':
            return (
                <td
                    className={`rdp-day ${props.day.date < today ? 'rdp-disabled' : ''}  ${props.modifiers.today ? 'rdp-today' : ''} ${props.modifiers.hidden ? 'rdp-hidden' : ''} ${props.modifiers.outside ? 'rdp-outside' : ''}`}
                    data-day={dateFormatted}
                    role="gridcell"
                >
                    {props.children}
                </td>
            )
        default:
            return (
                <td
                    className={`rdp-day ${!eventDates.exists(dateFormatted) ? 'rdp-disabled' : ''}  ${props.modifiers.selected ? 'rdp-selected' : ''} ${props.modifiers.today ? 'rdp-today' : ''} ${props.modifiers.hidden ? 'rdp-hidden' : ''} ${props.modifiers.outside ? 'rdp-outside' : ''}`}
                    data-day={dateFormatted}
                    role="gridcell"
                >
                    {props.children}
                </td>
            )
    }

}

function CustomDayButton(props: { day: CalendarDay; modifiers: Modifiers; } & ButtonHTMLAttributes<HTMLButtonElement>) {
    const eventDates = useEventDates();
    const dateMoment = moment(props.day.date);
    const dateFormatted = dateMoment.format('YYYY-MM-DD');
    const eventDate = eventDates.get(dateFormatted);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (eventDates.mode) {
        case 'edit':
            const disabled = props.day.date < today;
            return (
                <button
                    aria-label={dateMoment.format('dddd, MMMM Do, YYYY')}
                    className={`rdp-day_button ${!disabled || eventDate ? 'edit-day-button' : ''} ${eventDate ? 'selected' : ''}`}
                    tabIndex={props.modifiers.today ? 0 : -1}
                    type="button"
                    onClick={() => {
                        if (disabled) return;
                        
                        if (eventDate) {
                            eventDates.delete(eventDate.id);
                        } else {
                            eventDates.add(dateFormatted);
                        }
                    }}
                >
                    {props.day.date.getDate()}
                </button>
            )
        default:
            return (
                <button
                    aria-label={dateMoment.format('dddd, MMMM Do, YYYY')}
                    className={`rdp-day_button ${eventDates.exists(dateFormatted) ? 'edit-day-button' : ''} ${eventDate?.date === eventDates.selectedDate?.date ? 'selected' : ''}`}
                    tabIndex={props.modifiers.today ? 0 : -1}
                    type="button"
                    onClick={() => {
                        if (eventDate) {
                            eventDates.setSelectedDate(eventDate);
                        }
                    }}
                >
                    {props.day.date.getDate()}
                </button>
            )
    }

}