"use client";

import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion';

import { SideBarOpenCloseContext } from '@/hooks/useSideBarOpenClode';
import useMediaQuery from '@/hooks/useMedia';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';




interface ActionBarLayoutProps {
    children: React.ReactNode;
    className?: string;
    position?: string;
}
/**
 * A layout component for an action bar with fixed positioning, typically used
 * for actions like "Continue," "Next," or "Submit" at the bottom of a page.
 *
 * @param {React.ReactNode} children - The elements to render inside the action bar.
 * @param {string} [title] - Optional title for the action bar.
 * @param {string} [className] - Additional class names to apply to the action bar.
 * @param {string} [idName] - Optional ID to apply to the action bar.
 *
 * @returns {React.ReactElement} The rendered action bar layout.
 *
 * @example
 * ```jsx
 * <ActionBarLayout title="Action Bar Title">
 *    <Button>Submit</Button>
 * </ActionBarLayout>
 * ```
 */

const ActionBarLayout: React.FC<ActionBarLayoutProps> = ({
    children,
    className,
    position = 'bottom'
}) => {

    const { isSideBarOpen } = useAppSelector(state => state.sidebar);
    const disatch = useAppDispatch()
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const [width, setWidth] = useState('calc(100vw - 301px)'); // Default width

    React.useEffect(() => {
        // Update the width based on the state after the component mounts
        const newWidth = isTablet ? "100vw" : isSideBarOpen ? 'calc(100vw - 301px)' : 'calc(100vw - 61px)';
        setWidth(newWidth);
    }, [isTablet, isSideBarOpen]);

    return (
        <motion.div
            initial={{ width: 'calc(100vw - 301px)' }}
            animate={{ width }}
            // transition={{ duration: 0 }}
            // exit={{ width: 'calc(100vw - 301px)' }}
            className={cn(`flex items-center justify-end bg-white shadow-md px-4 py-2 gap-5 border-t-2 rounded-t-md border-gray-300   fixed ${position === "top" ? "top-0" : "bottom-0"} right-0 w-full z-40`, className)}>
            {children}
        </motion.div>
    )
}

export default ActionBarLayout;
