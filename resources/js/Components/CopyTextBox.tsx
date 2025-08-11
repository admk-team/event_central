import { Copy, CopyCheck } from 'lucide-react'
import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import toast from 'react-hot-toast';

export default function CopyTextBox({ text }: { text: string }) {
    const [textCopied, setTextCopied] = useState(false);

    const copyText = () => {
        navigator.clipboard.writeText(text)
        .then(() => {
            toast.success("Copied!");
            setTextCopied(true);
            
            setTimeout(() => setTextCopied(false), 3000);
        })
        .catch(() => {
            toast.error("Failed to copy");
        });
    }

    const iconJSX = textCopied ? <CopyCheck size={18} /> : <Copy size={18} />;

    return (
        <InputGroup>
            <Form.Control type="text" value={text} disabled />
            <Button type="button" variant="light" size="sm" className="border border-dark" onClick={copyText}>{iconJSX}</Button>
        </InputGroup>
    )
}
