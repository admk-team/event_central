import React from "react";
import { Button } from "react-bootstrap";
import ShareEventModal from "./Common/ShareEventModal";

type ShareEventButtonProps = {
  event: any;
} & Parameters<typeof Button>[0]

const ShareEventButton: React.FC<ShareEventButtonProps> = ({ event, children, ...props }) => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <Button
        onClick={() => setShow(true)}
        children={children}
        {...props}
      />
      <ShareEventModal
        show={show}
        onHide={() => setShow(false)}
        event={event}
      />
    </>
  );
};

export default ShareEventButton;
