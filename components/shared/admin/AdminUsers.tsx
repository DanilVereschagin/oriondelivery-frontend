import React from 'react';

interface Props {
	className?: string;
}

export const AdminUsers: React.FC<Props> = ({ className }) => {
	return <div className={className}>Admin Users</div>;
};
