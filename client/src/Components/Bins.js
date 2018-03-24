import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.png';
import axios from 'axios';

class Bins extends Component {
    constructor(){
        super();
        this.state = {
            inventory: [],
        }
    }

componentDidMount(){
    axios.get(`http://localhost:8080/api/bin/${this.props.match.params.letter}`)
        .then(response => {
            this.setState({
                inventory: response.data,
                });
            });
        }



    render(){
        const shelf = 
            this.state.inventory.map((e,i) => { if(e.name!==""){
                return (<Link key={i}to={`/bin/${this.props.match.params.letter}${this.state.inventory[i].bin}`} className='bins'>Bin {this.state.inventory[i].bin}</Link>)}
                else { return <Link key={i}to={`/create/${this.props.match.params.letter}${i+1}`} className="add-item">+ Add inventory to bin</Link>}
            })
          
        return (
            <div>
            <header className='shelfie-shelf'>    
          <Link to='/'><div className='shelfie-img'><img className='logo' src={logo} alt={'logo'}/></div></Link><div className='shelf-link'><p>Shelf {this.props.match.params.letter}</p></div>
            </header>
            {shelf}
            </div>
        )
    }
}
export default Bins;