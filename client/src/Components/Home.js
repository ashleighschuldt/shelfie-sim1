import React, { Component } from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

import logo from '../logo.png';


class Home extends Component {
    render(){
        return (
            <div>
                        <header className='shelfie'>    
          <Link to='/'><img className='logo-home' src={logo} alt={'logo'}/></Link><p className='shelfie'>SHELFIE</p>
                        </header>
                        
            <Link to='/bins/A' className='shelves'>Shelf A</Link>
            <Link to='/bins/B' className='shelves'>Shelf B</Link>
            <Link to='/bins/C' className='shelves'>Shelf C</Link>
            <Link to='/bins/D' className='shelves'>Shelf D</Link>
                    </div>
        )
    }
}
export default Home;