"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'; // Assuming you're using a dialog from a UI library
import { Button } from '@/components/ui/button';
import React from 'react';
import { Eye } from 'lucide-react';

interface DialogModalProps {
    triggerLabel: React.ReactNode;
    title: string;
    children: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    isDisabled?: boolean;
    diasbledMessage?: string;
}

const DialogModal: React.FC<DialogModalProps> = ({
    triggerLabel,
    title,
    children,
    confirmLabel,
    cancelLabel,
    onConfirm,
    isDisabled = false,
    diasbledMessage
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {triggerLabel}
            </DialogTrigger>
            <DialogContent className='max-w-xl '>

                {
                    !isDisabled ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>{title}</DialogTitle>
                            </DialogHeader>
                            <div className="pt-4 h-auto ">
                                {children}
                            </div>
                            <DialogFooter className="pt-4">
                                {
                                    cancelLabel &&
                                    <DialogTrigger asChild>
                                        <Button variant={confirmLabel ? "outline" : "default"} >
                                            {cancelLabel}
                                        </Button>
                                    </DialogTrigger>
                                }
                                {
                                    confirmLabel &&
                                    <Button variant="default" onClick={onConfirm} disabled={isDisabled}>
                                        {confirmLabel}
                                    </Button>
                                }
                            </DialogFooter>
                        </>
                    ) : (
                        <DialogHeader >
                            <DialogTitle className='capitalize text-gray-600'  >{diasbledMessage}</DialogTitle>
                        </DialogHeader>
                    )

                }
            </DialogContent>
        </Dialog>
    );
};

export default DialogModal;
