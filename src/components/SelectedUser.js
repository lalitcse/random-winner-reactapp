import React, { Fragment } from "react";
// import pic from '../img/pic.jpg'
import trophy from '../img/trophy.svg'
import bet from '../img/bet.svg'
import coin from '../img/coin.svg'

const SelectedUser = ({ selectedUser }) => {
    let selected_user_length = selectedUser.length
    return (
        <Fragment>
            <div className='selected_list_head'>
            <p>Playing {selected_user_length}</p>
        </div>
        <div className='selected_list_body'>
            <div className='list_inner_wrapper'>
        {selectedUser.map(item => (
            <div className='list_row' key={item.id}>
                <div className='cell-1'>
                    <span className='user_img_box' style={{textAlign: 'center'}}>
                        <img src={item['Profile Image']} alt='user img' />
                    </span>
                </div>
                <div className='cell-2'>
                    <p className='user_name'>{item.Name}</p>
                    <label><img src={trophy} alt='user img' /></label><label className='user_name_text'>{item.win}</label>
                    <label> <img src={bet} alt='user img' /></label><label className='user_name_text'>{item.Bet}</label>
                </div>
                <div className='cell-3'>
                    <p className='user_price'><img src={coin} alt='user img' /> {item.Price}</p>
                </div>
            </div>
        ))}
            </div>
        </div>
      </Fragment>
    )
}

export default SelectedUser