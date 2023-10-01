import React from 'react';

function TestComponent(props) {
	return (
		<div>
			{props.thatData}
			{props.thisData}
		</div>
	);
}

export default TestComponent;
