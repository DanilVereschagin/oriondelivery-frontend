import React from 'react';

interface Props {
	className?: string;
}

export const AdminStatistics: React.FC<Props> = ({ className }) => {
	return <div className={className}>Statistics</div>;
};
