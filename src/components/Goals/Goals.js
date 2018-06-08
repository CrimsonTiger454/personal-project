import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser, getCalorieGoal} from '../../dux/reducer';
import './Goals.css';

export class Goals extends Component {
        constructor () {
            super();
            this.state = {
                editting: true,
                calorieInput: '',
                calories: ''
            }
            this.editOffandSave = this.editOffandSave.bind(this);
            this.editON = this.editOn.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidMount() {
            this.props.getCalorieGoal();
        }

        handleInputChange (event) {
            this.setState({calorieInput: event.target.value})
        }

        editOn () {
            this.setState({editting: true})
        }

        editOffandSave () {
            const {calorieInput} = this.state;
            this.setState({editting: false})
            axios.put('/setCalorieGoal', {calorieInput}).then( res => {
                console.log(res.data)
            })
            this.setState({calorieInput: ''})
            
        }

    render () {
        const {caloriegoal} = this.props.userCalorieGoal;
        const {displayname} = this.props.user;
        
        if (!displayname) {
            return (
                <h2>Looks like that didn't work,<br/> please go back and <a href={process.env.REACT_APP_LOGIN}>try again</a></h2>
            );
        }
        return (
            <div className='goals-main'>
                <h1 className='title'>Goals</h1>

                <div className='calories-goal'>
                    <h1>Daily Calorie goal: <br/> {caloriegoal} </h1>
                        {
                            this.state.editting ?
                            <div>
                                <input onChange={this.handleChange} value={this.state.calorieInput}/>
                                <button onClick={this.editOffandSave}>Save</button>
                            </div>
                            :
                            <div>
                                <h1>{this.state.calories}</h1>
                                <button onClick={this.editON}>edit</button>
                            </div>
                        }
                </div>

                <div className='macros-goal'>
                    <h1>Daily Macro Goals:</h1>
                        <ul className='macros'>
                            <li>Fat: </li>
                            <li>Protein: </li>
                            <li>Carbs: </li>
                        </ul>
                        <button className='edit-macros'>Edit</button>
                </div>
            </div>
        )
    }
}
function mapStateToProps (reduxState) {
    return {
        user: reduxState.user,
        userCalorieGoal: reduxState.calorieGoal
    }
}
export default connect(mapStateToProps, {getUser, getCalorieGoal})(Goals);