import { useEffect, useState } from "react";

const useScroll = (threshold: number = 10) => {


    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsSticky(scrollPosition >= threshold);
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);
    return isSticky;
}

export default useScroll;