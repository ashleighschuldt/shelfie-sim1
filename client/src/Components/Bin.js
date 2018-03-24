import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.png';
import axios from 'axios';

class Bin extends Component {
    constructor(props){
        super(props);
        this.state = {
            bin: '',
            id:'',
            image: '',
            name: '',
            price: '',
            shelf: '',
            buttonText: 'Edit',
            isDisabled: true,
        }
        this.deleteInventory = this.deleteInventory.bind(this);
        this.updateInventory = this.updateInventory.bind(this);
        this.OnChange = this.OnChange.bind(this);
    }


componentWillMount(){
    axios.get(`http://localhost:8080/api/bin/${this.props.match.params.letter}/${this.props.match.params.Num}`)
        .then(response => {
            this.setState(response.data);
            });
        }

deleteInventory(){
    axios.delete(`http://localhost:8080/api/bin/${this.props.match.params.letter}/${this.props.match.params.Num}/?id=${this.state.id}`)
    .then(res => {
        this.setState(res.data)
        this.props.history.goBack();
    })
       
}

updateInventory(){
    if(!this.state.isDisabled){

        axios.put(`http://localhost:8080/api/bin/${this.state.id}`, {
            name: this.state.name,
            price: this.state.price,
            bin: this.props.match.params.Num,
            shelf: this.props.match.params.letter,
            id: this.state.id
        })
        .then(res => {
            res.data.buttonText = 'Edit';
            res.data.isDisabled = true;
            this.setState(res.data)
            
        })
    } else {
        this.setState({buttonText: 'Save', isDisabled: false})
    }
       
}
       


OnChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
}

render(){
    const name = this.state.isDisabled?<input disabled onChange={this.OnChange} name='name' className='name' value={this.state.name}/>:<input onChange={this.OnChange} name='name' className='name' value={this.state.name}/>
    const price = this.state.isDisabled?<input disabled onChange={this.OnChange} name='price' className='name' value={this.state.price}/>:<input onChange={this.OnChange} name='price' className='name' value={this.state.price}/>
    return (
        <div>
         <header className='shelfie-bin'>    
            <div className='logo-bin'><Link to='/'><img className='logo-bin' src={logo} alt={'logo'}/></Link></div>
            <div className='shelf-link-bin'><Link className='shelf-link-bin'to={`/bins/${this.props.match.params.letter}`}>Shelf {this.props.match.params.letter}</Link></div> 
                <div className='bin-header'>Bin {this.props.match.params.Num}</div>
        </header>
        <div className='bin-div'>
            <div>
                <img className='image-bin' src={this.state.image}/>
            </div>
            <div>
            Name
            <br></br>
            {name}
            <br></br>
            Price
            <br></br>
            {price}
            <br></br>
            
            <div className='buttons'>
            <button className='edit' onClick={this.updateInventory}>{this.state.buttonText}</button>
            <button className='delete' onClick={ this.deleteInventory}>Delete</button>
            </div>
            </div>
            </div>
        </div>
        )
    }
}
export default Bin;