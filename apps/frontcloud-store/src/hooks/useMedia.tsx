import { useEffect, useState } from "react"


const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {

        const media = window.matchMedia(query);
        const handleChange = () => (setMatches(media.matches))

        // Set initial state
        setMatches(media.matches);

        // Listen for changes
        media.addEventListener('change', handleChange);


        // Cleanup listener on unmount
        return () => {
            media.removeEventListener('change', handleChange);
        };

    }, [query])

    return matches;
}

export default useMediaQuery;