"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'; // Assuming you're using a dialog from a UI library
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';

interface ConfirmationDialogProps {
    triggerLabel: React.ReactNode;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel: string;
    onConfirm: () => void;
    isDisabled?: boolean;
    diasbledMessage?: string;
    open?: boolean;
    onClose?: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    triggerLabel,
    title,
    description,
    confirmLabel,
    cancelLabel,
    onConfirm,
    isDisabled = false,
    diasbledMessage,
    open,
    onClose
}) => {
    return (
        <Dialog open={open} onOpenChange={onClose}  >
            <DialogTrigger className={cn("text-white w-10 h-10 flex items-center justify-center rounded-md bg-red-500",
                isDisabled && 'cursor-not-allowed pointer-events-none bg-gray-500'
            )}>
                {triggerLabel}
            </DialogTrigger>
            <DialogContent>
                <>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription className="pt-4">
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="pt-4">
                        <DialogTrigger className="text-black px-2 border border-gray-500 rounded-md ">
                            {cancelLabel}
                        </DialogTrigger>
                        <Button variant="default" onClick={onConfirm} disabled={isDisabled}>
                            {confirmLabel}
                        </Button>
                    </DialogFooter>
                </>

            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationDialog;
