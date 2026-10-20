import Skeleton from "react-loading-skeleton";

interface LoaderProps {
	count?: number;
	height?: number;
	className?: string;
}

export const Loader = ({ count = 5, height = 40, className = "" }: LoaderProps) => {
	return <Skeleton count={count} height={height} className={className} />;
};
