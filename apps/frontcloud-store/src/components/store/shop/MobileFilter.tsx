import CustomDrawer from "./CustomDrawer";
import CustomSheet from "./CustomSheet";

interface FilterProps {
    category: string;
    filters: { [key: string]: string[] };
    handleRemoveFilter: (type: string, value: string) => void;
}

const MobileFilter = ({
    category,
    filters,
    handleRemoveFilter
}: FilterProps) => {
    return (
        <div className='grid grid-cols-2 w-full border divide-x-2  rounded-md text-center py-1'>
            <CustomDrawer title="Move Goal" description="Set your daily activity goal." />
            <CustomSheet
                filters={filters}
                handleRemoveFilter={handleRemoveFilter}
            />
        </div>
    )
}

export default MobileFilter;