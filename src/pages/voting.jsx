import {url} from '../app';
import React, {useState, useEffect} from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Component, PropTypes } from 'react';
import styles from './voting.css'
import ApexCharts from 'apexcharts'
import { AiOutlineCheck, AiOutlineClose, AiFillHome, AiFillHeart, AiFillPlusCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';
import { PieChart } from 'react-minimal-pie-chart';
// import { useEffect, useState } from "react";
import { HiUserGroup } from 'react-icons/hi'
import axios from "axios";

<head>
    <title>Voting</title>
      <link rel="stylesheet" href="componenta/voting.css" />
</head>

const user = {

  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',

}
const navigation = [

  { name: <AiFillHome size={30}/>, href: '#', current: true },
  { name: <AiFillHeart size={30}/>, href: '#', current: false },
  { name: <AiFillPlusCircle size={30} />, href: '#', current: false },
  { name: <HiUserGroup size={30} />, href: '#', current: false },
  { name: <AiOutlineSearch size={30} />, href: '#', current: false}

]
const userNavigation = [

  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },

]

const Votes = [
  { name: 'Luiza', current: 'approve'},
  { name: 'Tri', current: 'oppose'},
  { name: 'Rachel', current: 'abstain'}
]


const remaining = {
  position: 'center',
  textAlign: 'center',
  };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function voteMethod(item) 
{   
  <label>{item }</label>        
  if((item === 'yes') || (item === 'Yes'))
    return <label style={{float: 'right', color: '#219653'}}> <AiOutlineCheck /></label>
  else if(item === 'no' || item === 'No')
    return <label style={{float: 'right', color: '#FA7E0C'}}> <AiOutlineClose /></label>
  else
    return <label style={{float: 'right'}}> <BsCircle /></label>
}

function RenderUsers(users_id) {

  const user_id = users_id.p;

  console.log(user_id)

  const [userInfo, setUserInfo] = useState({})
  useEffect( () => {
      const id = localStorage.getItem("id")
  
      return fetch(url + 'users/' + user_id , {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      })
      .then(resp => resp.json())
      .then(data => {
          console.log(data)
          setUserInfo(data)
      })
  }, [])

  return (
      <div>        
       <pre>{JSON.stringify(userInfo?.user?.name, null, 2)} </pre>
      </div>
  );
}

function RenderUsersImg(users_id) {

  const user_id = users_id.p;

  console.log(user_id)

  const [userInfo, setUserInfo] = useState({})
  useEffect( () => {
      const id = localStorage.getItem("id")
  
      return fetch(url + 'users/' + user_id , {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      })
      .then(resp => resp.json())
      .then(data => {
          console.log(data)
          setUserInfo(data)
      })
  }, [])

  return (
       <img src={userInfo}
                alt={userInfo} />
  );
}

function ChangeDate(data) {

  const FormatDate = () => {
    let dateTimeString =
      data.getDate() +
      '/' +
      (data.getMonth() + 1) +
      '/' +
      data.getFullYear() +
      ' ';

    let hours = data.getHours();
    let minutes = data.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    dateTimeString = dateTimeString + hours + ':' + minutes + ' ' + ampm;

    return (
      <label> dateTimeString </label>
      ); // 4/5/2021 4:34 pm
  };

}

function Voting() {

  const [proposals, setProposals] = useState([])
  useEffect( () => {
    const token = localStorage.getItem("token")
    return fetch(url + 'proposals/9' , {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(data => {
        setProposals(data.proposals)
        console.log(data)
    })
  }, [])

  const handleSubmit = (votetype) => {
    const token = localStorage.getItem("token")
    fetch(url + 'proposals/9/votes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({"vote": {"value":votetype}})
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        
        fetch(url + 'proposals/9/votes' , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setVotes(data.votes)
            console.log(data)
        })

    })

}

  const [singleProposal, setSingleProposal] = useState([])
    useEffect( () => {
        const token = localStorage.getItem("token")
        return fetch(url + 'proposals/2' , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setSingleProposal(data.proposal)
            console.log(data)
        })
    }, [])

    const [votes, setVotes] = useState([])
    useEffect( () => {
        const token = localStorage.getItem("token")
        return fetch(url + 'proposals/9/votes' , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setVotes(data.votes)
            console.log(data)
        })
     }, [])

    const fullDate = singleProposal.voting_deadline
    const testDate = String(fullDate)
    const [newDate, time] = testDate.split('T')
    const [year, month, date] = newDate.split('-')
    const t = String(time)
    const [hour, minute, second] = t.split(':')
    const seg = String(second)
    const [sec, mili] =  seg.split('.')
    var dateTime = new Date(parseInt(year), parseInt(month), parseInt(date), parseInt(hour), parseInt(minute), parseInt(sec))
    var finalDate =  new Date();
    var difference= Math.abs(dateTime - finalDate)
    var days = parseInt(difference/(1000 * 3600 * 24))
    var segs = difference / 1000;
    var hours = parseInt((difference/(1000 * 3600 * 24) - days)*24)
    var minutes = parseInt((((difference/(1000 * 3600 * 24) - days)*24) - hours)*60);
   

  return (

      
    <div className={styles.backgound}>
      <Disclosure as="nav" className="bg-white shadow-sm">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="images/teste.png"
                    />
                    { <img
                      className="hidden lg:block h-8 w-auto" 
                      src="images/teste.png"
                    /> }
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'border-indigo-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                      'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                  <button className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{paddingTop: '20px'}}>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 bg-white shadow-sm">{singleProposal.title}</h1>
          </div>
        </header>
        <main>
          <div style={{padding: '20px', paddingLeft: '30px'}}>
            <label style={{color: '#4B5563'}}> {singleProposal.body} </label>
          </div>
          <div style={{paddingTop: '20'}}>
            <div>
    
              <h2 style={remaining}> {days} days, {hours} hours and {minutes} minutes Remaining </h2>
            </div>
            <div style={{alignContent: 'center', paddingTop: '20px',  display: 'block', width: '100%', height: '300px'}}>
              <PieChart
              // animationDuration={200}
              // radius= {15}
              center={[50, 50]}
              lineWidth={20}
              rounded={50}
              text={'23%'}
              // paddingAngle={15}
                data={[
                  { title: 'One', value: 10, color: '#219653', radius: 50 },
                  { title: 'Two', value: 15, color: '#DDDDDD', radius: 50 },
                  { title: 'Three', value: 20, color: '#FA7E0C' , radius: 50},
                ]}
              />
            </div>
            <div className="wrapper" style={{paddingTop: '30px', textAlign: 'center'}}>
                <div><button style={{backgroundColor: '#219653', width: '120px', borderRadius: '25px'}} onClick={() => handleSubmit("Yes")}>Approve</button></div>
                <div><button style={{backgroundColor: '#DDDDDD', width: '120px', borderRadius: '25px'}} onClick={() => handleSubmit("Abstain")}> Abstain</button></div>
                <div><button style={{backgroundColor: '#FA7E0C', width: '120px', borderRadius: '25px'}} onClick={() => handleSubmit("No")}>Oppose</button></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold leading-tight text-gray-900 bg-white shadow-sm" style={{paddingTop: '20px', paddingLeft:'30px'}}>Votes</h3>
            </div>
            <div>
            {votes.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-50 border-500 text-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                      'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <div className='wrapper_2'>
                      <div> <RenderUsersImg p={item.voter_id} /> </div>
                      <div style={{color: '#4B5563'}}> <RenderUsers p={item.voter_id} />  </div>
                      <div > {JSON.stringify(item} </div>
                    </div>
                  </a>
            ))}
            </div>
          </div>
        </main>
    </div>
  )
}



export default Voting;

