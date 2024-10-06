

interface InfoCardData {
    label: string;
    value: number;
    icon: JSX.Element;
}
interface InfoCardProps {
    data: InfoCardData;
}

const InfoCard = ({ data }: InfoCardProps) => {
    return (
        <div className='bg-white shadow-md p-3 rounded-lg border flex items-center gap-x-3 justify-start'>
            {data.icon}
            <div className='flex flex-col items-start w-full'>
                <span className='text-sm text-gray-600'>{data.label}</span>
                <span className='font-bold text-lg'>{data.value}</span>
            </div>
        </div>
    );
};

export default InfoCard;
