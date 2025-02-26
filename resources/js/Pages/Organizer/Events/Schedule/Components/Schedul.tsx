import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const hours = Array.from({ length: 16 }, (_, i) => 8 + i); // Generates [8, 9, 10, ..., 23]
const slots = Array.from({ length: 6 }); // Creates 6 buttons per hour (each slot = 10 min gap)

const Schedule = () => {
    const [hoveredSlot, setHoveredSlot] = useState<{ hour: number; slot: number } | null>(null);

    // Function to calculate session time based on hour and slot index
    const getSessionTime = (hour: number, slotIndex: number) => {
        const startMinutes = slotIndex * 10; // Start from 8:10, 8:20, 8:30, etc.
        const endMinutes = startMinutes + 10;
        return `${hour}:${String(startMinutes).padStart(2, "0")} - ${hour}:${String(endMinutes).padStart(2, "0")}`;
    };

    return (
        <div className="">
            <div className="">
                <div className="border-top">
                    {hours.map((hour, hourIndex) => (
                        <div key={hourIndex} className=" border-bottom position-relative">
                            <strong className="text-muted">{hour}:00</strong>

                            {/* Slots (Buttons) */}
                            <div className="d-flex flex-wrap flex-column">
                                {slots.map((_, slotIndex) => (
                                    <div key={slotIndex} className="position-relative">
                                        <Button
                                            className=" w-100 position-relative"
                                            variant=""
                                            size="md"
                                            onMouseEnter={() => setHoveredSlot({ hour, slot: slotIndex })}
                                            onMouseLeave={() => setHoveredSlot(null)}
                                        >
                                            {/* Slot {slotIndex + 1} */}

                                            {hoveredSlot?.hour === hour && hoveredSlot?.slot === slotIndex && (
                                                <div className="card text-muted border-1 rouned position-absolute w-100" style={{ borderRadius: '9px' }}>
                                                    New Session <br />
                                                    {getSessionTime(hour, slotIndex)}
                                                </div>
                                            )}
                                        </Button>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Schedule;
