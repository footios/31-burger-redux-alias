import React from 'react';

import Aux from '../../hoc/Aux';

export default ({children}) => {
	return (
		<Aux>
			<div>Toolbar, SideDrawer, Backdrop</div>
			<main>{children} </main>
		</Aux>
	);
};

