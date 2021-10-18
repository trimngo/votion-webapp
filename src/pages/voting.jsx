import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import React, { Component, PropTypes } from 'react';
import styles from './voting.css'
import ApexCharts from 'apexcharts'
import { AiOutlineCheck, AiOutlineClose, AiFillHome, AiFillHeart, AiFillPlusCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';
import { PieChart } from 'react-minimal-pie-chart';
import { useEffect, useState } from "react";
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

  { name: <AiFillHome />, href: '#', current: true },
  { name: <AiFillHeart />, href: '#', current: false },
  { name: <AiFillPlusCircle />, href: '#', current: false },
  { name: <HiUserGroup />, href: '#', current: false },
  { name: <AiOutlineSearch />, href: '#', current: false}

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

// useEffect(() => {
//   api
//     .get("/users/1")
//     .then((response) => setUser(response.data))
//     .catch((err) => {
//       console.error("ops! ocorreu um erro" + err);
//     });
// }, []);

// const gitHubUrl = "https://api.github.com/users/deekshasharma";

// const getGiHubUserWithAxios = async () => {
//   const response = await axios.get(gitHubUrl);
//   setUserData(response.data);
// };

// function App() {
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     getGitHubUserWithFetch();
//   }, []);

//   const getGitHubUserWithFetch = async () => {
//     const response = await fetch(gitHubUrl);
//     const jsonData = await response.json();
//     setUserData(jsonData);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h2>GitHub User Data</h2>
//       </header>
//       <div className="user-container">
//         <h5 className="info-item">{userData.name}</h5>
//         <h5 className="info-item">{userData.location}</h5>
//         <h5 className="info-item">{userData.blog}</h5>
//         <h5 className="info-item">{userData.company}</h5>
//       </div>
//     </div>
//   );
// }

// export default class PersonList extends React.Component {
//   state = {
//     persons: []
//   }

//   componentDidMount() {
//     axios.get(`http://localhost:3000/proposals`)
//       .then(res => {
//         const persons = res.data;
//         this.setState({ persons });
//       })
//   }

//   render() {
//     return (
//       <ul>
//         { this.state.persons.map(person => <li>{person.id}</li>)}
//       </ul>
//     )
//   }
// }

// const token = {}

// const config = {
//   headers: { Authorization: `Bearer ${token}` }
// };

// const bodyParameters = {
//  key: "value"
// };

// axios.post( 
// 'http://localhost:3000/voting',
// bodyParameters,
// config
// ).then(console.log).catch(console.log)

const remaining = {
  position: 'center',
  textAlign: 'center',
  };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function voteMethod(item) 
{   
  <label>{item.current }</label>        
  if(item.current === 'approve')
    return <label style={{float: 'right', color: '#219653'}}> <AiOutlineCheck /></label>
  else if(item.current === 'oppose')
    return <label style={{float: 'right', color: '#FA7E0C'}}> <AiOutlineClose /></label>
  else
    return <label style={{float: 'right'}}> <BsCircle /></label>
}

function Voting() {
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
            <h1 className="text-3xl font-bold leading-tight text-gray-900 bg-white shadow-sm">Idea 1</h1>
          </div>
        </header>
        <main>
          <div style={{padding: '20px', paddingLeft: '30px'}}>
            <label style={{color: '#4B5563'}}>Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu </label>
          </div>
          <div style={{paddingTop: '20'}}>
            <div>
              <h2 style={remaining}> Remaining days </h2>
            </div>
            <div style={{alignContent: 'center', paddingTop: '20px',  display: 'block', width: '100%', height: '300px'}}>
              <PieChart
              // animationDuration={200}
              // radius= {15}
              center={[50, 50]}
              lineWidth={20}
              rounded={50}
              // paddingAngle={15}
                data={[
                  { title: 'One', value: 10, color: '#219653', radius: 50 },
                  { title: 'Two', value: 15, color: '#DDDDDD', radius: 50 },
                  { title: 'Three', value: 20, color: '#FA7E0C' , radius: 50},
                ]}
              />
            </div>
            <div className="wrapper" style={{paddingTop: '30px', textAlign: 'center'}}>
                <div><button style={{backgroundColor: '#219653', width: '150px', borderRadius: '25px'}}>Approve</button></div>
                <div><button style={{backgroundColor: '#DDDDDD', width: '150px', borderRadius: '25px'}}> Abstain</button></div>
                <div><button style={{backgroundColor: '#FA7E0C', width: '150px', borderRadius: '25px'}}>Oppose</button></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold leading-tight text-gray-900 bg-white shadow-sm" style={{paddingTop: '20px', paddingLeft:'30px'}}>Votes</h3>
            </div>
            <div>
            {Votes.map((item) => (
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
                      <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                      <div style={{color: '#4B5563'}}> {item.name} {user.email} </div>
                      <div > {voteMethod(item)} </div>
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

