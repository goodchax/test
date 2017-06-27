import React, {PropTypes} from 'react';
import styles from './index.scss';

class Drawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: props.visible,
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			visible: nextProps.visible,
		})
	}

	onLayerClick() {
		this.props.onCloseHandle();
		// this.setState({
		// 	visible: false,
		// })
	}
	render() {
		const _height = document.documentElement.clientHeight;
		const _width = document.documentElement.clientWidth;
		const {visible} = this.state;
	  return (
			<div>
			{ visible &&
				<div className="normal" ref="drawer">
		    	<div className="masklayer" onClick={this.onLayerClick.bind(this)}></div>
		    	<div className="modal" style={{width: '600px'}}>
						{this.props.children}
		    	</div>
		    </div>
			}
			</div>
	  );
	}
}

//
Drawer.propTypes = {
  onCloseHandle: PropTypes.func.isRequired
};
export default Drawer;
