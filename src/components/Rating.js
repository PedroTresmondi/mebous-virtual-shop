import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";


export default function Rating() {
    return (
        <div className="flex items-center -ml-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <StarIcon key={index} className="w-4 h-4 flex-shrink-0 text-yellow-300" />
            ))}
            {Array.from({ length: 1 }).map((_, index) => (
                <StarIconOutline key={index} className="w-4 h-4 flex-shrink-0 text-yellow-400" />
            ))}

        </div>
    )
}