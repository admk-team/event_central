import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Ticket = {
    id?: number;
    base_price: number;
};

type TicketDetail = {
    id?: number;
    ticket_no: number;
    ticket: Ticket;
    addons: Array<number>;
    fees_sub_total: number;
    addons_sub_total: number;
};

interface AttendeeTicketState {
    ticketsDetails: Array<TicketDetail>;
    discount: number;
    discount_code: string;
    subTotal: number;
    totalAmount: number;
    organizer_payment_note: string;
}

const initialState: AttendeeTicketState = {
    ticketsDetails: [],
    discount: 0,
    discount_code: "",
    subTotal: 0,
    totalAmount: 0,
    organizer_payment_note: "",
};

const calculateTotals = (state: AttendeeTicketState) => {
    const fees = state.ticketsDetails.reduce((acc, ticket) => acc + ticket.fees_sub_total, 0);
    const addons = state.ticketsDetails.reduce((acc, ticket) => acc + ticket.addons_sub_total, 0);
    state.subTotal = fees + addons;
    state.totalAmount = state.subTotal - state.discount;
};

const TicketsSlice = createSlice({
    name: "AttendeeTicketsSlice",
    initialState,
    reducers: {
        addNewTicket: (state, action: PayloadAction<TicketDetail>) => {
            state.ticketsDetails.push(action.payload);
            calculateTotals(state);
        },
        updateTicket: (state, action: PayloadAction<TicketDetail>) => {
            const index = state.ticketsDetails.findIndex(
                (t) => t.ticket_no === action.payload.ticket_no
            );
            if (index !== -1) {
                state.ticketsDetails[index] = action.payload;
                calculateTotals(state);
            }
        },
        deleteTicket: (state, action: PayloadAction<number>) => {
            state.ticketsDetails = state.ticketsDetails.filter(
                (t) => t.ticket_no !== action.payload
            );
            calculateTotals(state);
        },
        setDiscount: (state, action: PayloadAction<{ amount: number; code: string }>) => {
            state.discount = action.payload.amount;
            state.discount_code = action.payload.code;
            calculateTotals(state);
        },
        setOrganizerNote: (state, action: PayloadAction<string>) => {
            state.organizer_payment_note = action.payload;
        },
        resetTickets: () => initialState
    },
});

export const {
    addNewTicket,
    updateTicket,
    deleteTicket,
    setDiscount,
    setOrganizerNote,
    resetTickets
} = TicketsSlice.actions;

export default TicketsSlice.reducer;
