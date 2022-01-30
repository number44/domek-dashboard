import React from 'react';
interface PropsI {}
const Loader = ({}: PropsI) => {
	return (
		<div className="w-full flex-center">
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;
