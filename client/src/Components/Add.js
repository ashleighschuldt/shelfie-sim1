import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.png';
import axios from 'axios';

class Add extends Component {
    constructor(){
        super();
        this.state = {
            bin: '',
            id:'',
            image: '',
            name: '',
            price: '',
            shelf: '',
        }
    }

componentDidMount(){
        axios.get(`http://localhost:8080/api/bin/${this.props.match.params.letter}/${this.props.match.params.Num}`)
            .then(response => {
                this.setState(
                   response.data,
                    );
                });
            }    

OnChange(input, value){
        this.setState({
          [input]: value
        });
    }

addInventory(){
    console.log(this.state)
    axios.post(`http://localhost:8080/api/bin/${this.state.id}`, {
        name: this.state.name,
        price: this.state.price,
        bin: this.props.match.params.Num,
        shelf: this.props.match.params.letter,
    })
    .then(res => {
        this.setState( res.data )
        this.props.history.goBack();
    })
       
}

    render(){
        return (
            <div>
                <header className='shelfie-shelf'>    
                <div className='logo-bin'><Link to='/'><img className='logo' src={logo} alt={'logo'}/></Link></div>
                <div className='shelf-link-bin'><Link className='shelf-link'to={`/bins/${this.props.match.params.letter}`}>Shelf {this.props.match.params.letter}</Link></div> 
                <div className='bin-header'><p>Add to Bin {this.props.match.params.Num}</p></div>
                </header>
            <div className='add-container'>
                Name
                <br></br>
                <input onChange= { e => this.OnChange('name', e.target.value)}className='name' value={this.state.newName}></input>
                <br></br>
                Price
                <br></br>
                <input onChange={ e=> this.OnChange('price', e.target.value)}className='name' value={this.state.newPrice}></input>
                <br></br>
                <button onClick={() => this.addInventory()}className='add'>+ Add to Inventory</button>
            </div>
            </div>
        )
    }
}

export default Add;