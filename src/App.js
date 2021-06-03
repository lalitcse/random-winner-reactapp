import React, { Fragment, useEffect, useState } from 'react'
// import Pagination from "./components/Pagination";
import './App.css';
import logo from './img/logo2.svg'
import trophy from './img/trophy.svg'
import bet from './img/bet.svg'
import coin from './img/coin.svg'
import search from './img/search.svg'
import loader from './img/loader.gif'
import SelectedUser from './components/SelectedUser'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Play from './components/Play'

function App() {
  const [userlist, setUserlist] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedUser , setSelectedUser] = useState([])
  


  useEffect(() => {
    setLoading(true)
    fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json')
    .then(res => res.json())
    .then(data => {
      // setUserlist(data)
      let test = [...data]
      let result = test.map(function(el) {
        let img_url = el['Profile Image']
        let n = img_url.lastIndexOf('/');
        let result = img_url.substring(n + 1);
        let unique_id = result.slice(0, result.indexOf("."));
        let o = Object.assign({}, el);
        o.id = unique_id
        o.select = false;
        o.level = 0;
        o.win = 0;
        o.lost = 0;
        return o;
      })
      setUserlist(result)
      setLoading(false)
    })
  }, [])

// useEffect(() => {
//   const data = [ ...userlist ]
//   setUserlist(data)
// },[selectedUser])

  const checkClicked = (e, list) => {
    let checked = e.target.checked;
    setUserlist(userlist.map((data) => {
      if(list.id === data.id){
        data.select = checked
      }
      return data
    }))
    
    if(checked === true){
      setSelectedUser([...selectedUser, list])
    }else{
      const filteredItems = selectedUser.filter(item => item.id !== list.id)
      setSelectedUser(filteredItems)
    }
  }

  const sortFunction = (e) => {
    let drop_value = e.target.value
    if(drop_value === 'price_high_to_low'){
      const data_array = [ ...userlist ]
      setUserlist(data_array.sort(function(a, b){return b.Price - a.Price}))
    }
    if(drop_value === 'price_low_to_high'){
      const data_array = [ ...userlist ]
      setUserlist(data_array.sort(function(a, b){return a.Price - b.Price}))
    }
    if(drop_value === 'bet_high_to_low'){
      const data_array = [ ...userlist ]
      setUserlist(data_array.sort(function(a, b){return b.Bet - a.Bet}))
    }
    if(drop_value === 'bet_low_to_high'){
      const data_array = [ ...userlist ]
      setUserlist(data_array.sort(function(a, b){return a.Bet - b.Bet}))
    }
  }

  return (
    <Router>
      <Route exact path="/" >
        <Fragment>
            <div className='side_nav_wrapper'>
              <div className='img_box'>
                <img className='logo_img' src={logo} alt='logo'/>
              </div>
              <div className='selected_player_list_wrapper'>
              <SelectedUser selectedUser={selectedUser} />
              </div>
              <div className='side_nav_footer'>
                <Link to="/play"><button className='start_btn' disabled={selectedUser.length === 9 ? false : true}>Start</button></Link>
                <label className='select_alert'>{selectedUser.length < 9 ? 'Please select exact 9 players !' : ''}</label>
                <label className='select_alert'>{selectedUser.length > 9 ? 'Please select exact 9 players !' : ''}</label>
              </div>
            </div>
            <div className='main_wrapper'>
              <div className='main_header'>
                <p>Select playing 9</p>
              </div>
              <div className='filter_row'>
                <div className=''>
                  <div className='search_input_box'>
                    <img src={search} alt="icon" className="search_icon"/>
                    <input onChange={(e) => setSearchTerm(e.target.value)} type="text" className="search_table_input" placeholder='Search Players' />
                  </div>
                </div>
                <div className='sort_section'>
                  <label className='sort_lab'>Sort by</label>
                    <select  id="sort_select" className='sort_dropdown' onChange={(e) => sortFunction(e)}>
                      <option value="price_high_to_low">Price : High to Low</option>
                      <option value="price_low_to_high">Price : Low to High</option>
                      <option value="bet_high_to_low">Bet : High to Low</option>
                      <option value="bet_low_to_high">Bet : Low to High</option>
                    </select>
                </div>
                
              </div>
              <div className='table_wrapper'>
                <table cellSpacing={0} cellPadding={0} className='table_ht'>
                    <thead>
                      <tr>
                        <th scope="col">SELECT</th>
                        <th scope="col" className='user_name_head'>PLAYER NAME</th>
                        <th scope="col">LEVEL</th>
                        <th scope="col">AVATAR</th>
                        <th scope="col"><img src={bet} alt='user img' />BET</th>
                        <th scope="col"><img src={trophy} alt='user img' />WIN</th>
                        <th scope="col">LOST</th>
                        <th scope="col"><img src={coin} alt='user img' />PRICE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        loading === false ?
                        userlist.filter((val) => {
                          if(searchTerm === ''){
                            return val
                          }else if(val.Name.toLowerCase().includes(searchTerm.toLowerCase())){
                            console.log('full',{searchTerm})
                            return val
                          }
                        }).map((list)  => (
                          <tr key={list.id}>
                            <td data-label="checkbox"><input onChange={(e) => checkClicked(e, list)}  type="Checkbox" defaultChecked={list.select}  /></td>
                            <td data-label="name" className='user_name_val'>{list.Name}</td>
                            <td data-label="level">{list.level}</td>
                            <td data-label="avatar"><img src={list['Profile Image']} alt='user img' className='avatar_img' /></td>
                            <td data-label="bet">{list.Bet}</td>
                            <td data-label="win">{list.win}</td>
                            <td data-label="lost">{list.lost}</td>
                            <td data-label="price">{list.Price}</td>
                          </tr>
                        )) : <tr><td><img width={24} src={loader} alt="Loading..."/></td></tr>
                      }
                    </tbody>
                  </table>
                  <hr className='hr_line' />
              </div>
            </div>
        </Fragment>
      </Route>
      <Route path="/play">
        <Play selectedUser={selectedUser}  />
      </Route>
    </Router>
  );
}

export default App;
