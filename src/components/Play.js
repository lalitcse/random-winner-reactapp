import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import './Play.css'
import trophy from '../img/trophy.svg'
import bet from '../img/bet.svg'
import coin from '../img/coin.svg'

const Play = ({ selectedUser }) => {
    let [randomNumber, setRandomNumber] = useState()
    let [winner , setWinner] = useState([])
    useEffect(() => {
        let ran = (Math.floor(Math.random() * 9) + 1)
        setRandomNumber(ran);
        setWinner(selectedUser.map((data, index) => {
            if(ran === index + 1){
                console.log('inside',{ran},  index + 1 , data, data.Price)
              data.Price = parseInt(data.Price) + parseInt(data.Price)
              data.win = data.win + 1
            }
            data.Bet = parseInt(data.Bet) + 1
            data.level = data.level + 1
            return data
        }))
    }, [])


    return (
        <div>
            <div className='topnav'>
                <span className="dot">
                    <p className='random_number'>{randomNumber}</p>
                </span>
            </div>
            <div className='main_area'>
                {winner.map((data, index) => (
                    <div className={randomNumber === index + 1 ? 'card winner' : 'card losser'} key={data.id}>
                        <div className='profile_row'>
                            <div className='cell-1_'>
                                <span className='user_img_box' style={{textAlign: 'center'}}>
                                    <img src={data['Profile Image']} alt='user img' />
                                </span>
                            </div>
                            <div className='cell-2_'>
                                <p className='user_name_'>{data.Name}</p> 
                                <label className='user_name_text'>Level {data.level}</label>
                            </div>
                        </div>
                        <div className='image_box'>
                            <label> <img src={coin} alt='user img' /></label><label className='user_name_text'>{data.Price}</label>
                        </div>
                        <div className='image_box'>
                            <label><img src={bet} alt='user img' /></label><label className='user_name_text'>{data.Bet}</label>
                        </div>
                        <div className='image_box'>
                            <label> <img src={trophy} alt='user img' /></label><label className='user_name_text'>{data.win}</label>
                        </div>
                        {/* <span className='lose_win_flag'> */}
                        {randomNumber === index + 1 ? (
                        <span className='lose_win_flag win'>Winner</span>
                        ) : <span className='lose_win_flag lose'>Lose</span>}
                    </div>
                ))}
                
            </div>
            <div className='play_footer'>
                <Link to="/"><button className='back_btn'>BACK</button></Link>
            </div>
        </div>
    )
}

export default Play