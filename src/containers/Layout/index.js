import React, { useState } from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer';

export default ({children}) => {

	const [showSideDrawer, setShowSideDrawer] = useState(false)

	const sideDrawerHandler = () => {
		setShowSideDrawer(false)
	}

	const drawerToggleHandler = () => {
		setShowSideDrawer(true)
	}
	return (
		<Aux>
			<Toolbar drawerToggleClicked={drawerToggleHandler} />
			<Sidedrawer open={showSideDrawer} closed={sideDrawerHandler} />
			<main>{children} </main>
		</Aux>
	);
};

