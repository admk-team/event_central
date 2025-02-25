import React from "react";
import { Card, Button } from "react-bootstrap";

const hours = Array.from({ length: 16 }, (_, i) => 8 + i); // Generates [8, 9, 10, 11, 12, 13]
const slots = Array.from({ length: 6 }); // Creates 6 buttons per hour

const Schedule = () => {
    return (
        <div className="container mt-4">
        

            <Card className="p-3 shadow-sm">
              

                <div className="border-top pt-2">
                    {hours.map((hour, index) => (
                        <div key={index} className="pb-5 border-bottom">
                            <strong className="text-muted">{hour}:00</strong>
                            <div className="mt-2 d-flex flex-wrap flex-column gap-2">
                                {slots.map((_, i) => (
                                    <Button key={i} variant="outline-secondary" size="sm">
                                        Slot {i + 1}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Schedule;
