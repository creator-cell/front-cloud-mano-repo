"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'; // Assuming you're using a dialog from a UI library
import { Button } from '@/components/ui/button';

interface ConfirmationDialogProps {
    triggerLabel: React.ReactNode;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel: string;
    onConfirm: () => void;
    isDisabled?: boolean;
    diasbledMessage?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    triggerLabel,
    title,
    description,
    confirmLabel,
    cancelLabel,
    onConfirm,
    isDisabled = false,
    diasbledMessage
}) => {
    return (
        <Dialog>
            <DialogTrigger className="text-white w-10 h-10 flex items-center justify-center rounded-md bg-red-500">
                {triggerLabel}
            </DialogTrigger>
            <DialogContent>
                {
                    !isDisabled ? (
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

export default ConfirmationDialog;
